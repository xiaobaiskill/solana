import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";
// 转移用户balance

// devnet client
const client = new Connection(clusterApiUrl("devnet"));

const sender = new PublicKey("8Gknf8dsdqGsYHPAE9ro2NvTYUfYRUv4LmMKHucPR9ZN")
const receiver = new PublicKey("5yEedGLgXgAtKazfL5guyThECX24VSrf9HQiuJz1NXb8");

const recentBlockhash = await client.getLatestBlockhash()

// transfer balance from sender to receiver
const transaction = new Transaction()

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: receiver,
    lamports: 1000000000 //1 SOL
})
transaction.add(sendSolInstruction)

// 设置交易的recentBlockhash和feePayer
transaction.recentBlockhash = recentBlockhash.blockhash;
transaction.feePayer = sender;

console.log(transaction)

// console.log(base58.encode(transaction.serializeMessage()))
// 下面是解析
// transaction = Transaction.from(base58.decode(serializedTransaction))
// console.log(serializedTransaction.toString('hex'))
// transaction = Transaction.from(Buffer.from(serializedTransaction, 'hex'))


// 签名
const fromSecretKey = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))

transaction.sign(fromSecretKey)

if (!transaction.verifySignatures()) {
    console.error('Signature verification failed');
}
console.log(base58.encode(transaction.serialize()))

// let txid = await client.sendRawTransaction(transaction.serialize())
// console.log("transaction id:", txid)