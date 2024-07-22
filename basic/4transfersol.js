import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";
// 转移用户balance

// devnet client
const client = new Connection(clusterApiUrl("devnet"));

const keypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))

const sender = new PublicKey(keypair.publicKey)
const receiver = new PublicKey("5yEedGLgXgAtKazfL5guyThECX24VSrf9HQiuJz1NXb8");

// check balance before transfer 
let senderBalance = await client.getBalance(sender)
let receiverBalance = await client.getBalance(receiver)

console.log(`before sender:${sender.toBase58()}  --- balance: ${senderBalance / LAMPORTS_PER_SOL}`)
console.log(`before receiver:${receiver.toBase58()}  --- balance: ${receiverBalance / LAMPORTS_PER_SOL}`)


// transfer balance from sender to receiver
const transaction = new Transaction()

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: receiver,
    lamports: 1000000000 //1 SOL
})
transaction.add(sendSolInstruction)

const signature = await sendAndConfirmTransaction(client, transaction, [keypair])

console.log(signature)
console.log("send completed")


// check balance after transfer 
senderBalance = await client.getBalance(sender)
receiverBalance = await client.getBalance(receiver)

console.log(`after sender:${sender.toBase58()}  --- balance: ${senderBalance / LAMPORTS_PER_SOL}`)
console.log(`after receiver:${receiver.toBase58()}  --- balance: ${receiverBalance / LAMPORTS_PER_SOL}`)
