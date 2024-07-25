import { Connection, Keypair, LAMPORTS_PER_SOL, Transaction, TransactionMessage, sendAndConfirmTransaction, SystemProgram, clusterApiUrl, PublicKey, VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
const fromKeypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))
const toPublicKey = new PublicKey("BtTGdRFeqw5YS5iRGUoiqi8JzVhyzau2F1fDcXnv8ccg");

sendLegacyTransaction().catch(console.error);
sendVersionedTransaction().catch(console.error);

async function sendLegacyTransaction() {
    console.log("legacy transaction")
    // 第1种创建 legecy transaction 的方式
    // Create a legacy transaction
    // let transaction = new Transaction().add(
    //     SystemProgram.transfer({
    //         fromPubkey: fromKeypair.publicKey,
    //         toPubkey: toPublicKey,
    //         lamports: LAMPORTS_PER_SOL / 10,
    //     })
    // );
    // Sign transaction
    // transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // 第2种创建 lecygacy transaction 的方式
    const message = new TransactionMessage({
        payerKey: fromKeypair.publicKey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        instructions: [
            SystemProgram.transfer({
                fromPubkey: fromKeypair.publicKey,
                toPubkey: toPublicKey,
                lamports: LAMPORTS_PER_SOL / 10,
            }),
        ],
    }).compileToLegacyMessage();

    let transaction = new Transaction(message);

    transaction.feePayer = fromKeypair.publicKey;
    console.log("legacy Transaction: ", base58.encode(transaction.serialize({ requireAllSignatures: false })))
    transaction.sign(fromKeypair);

    // Send transaction
    // versioned transaction 用不了, 只能 legacy transaction 使用
    // const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
    // console.log("Legacy Transaction signature", signature);
}



async function sendVersionedTransaction() {
    console.log("versioned transaction")
    // Create a Versioned transaction message
    const message = new TransactionMessage({
        payerKey: fromKeypair.publicKey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        instructions: [
            SystemProgram.transfer({
                fromPubkey: fromKeypair.publicKey,
                toPubkey: toPublicKey,
                lamports: LAMPORTS_PER_SOL / 10,
            }),
        ],
    }).compileToV0Message();

    // Create a Versioned transaction
    let versionedTransaction = new VersionedTransaction(message);

    console.log("versioned Transaction: ", base58.encode(versionedTransaction.serialize()))

    // // Sign transaction
    versionedTransaction.sign([fromKeypair]);

    // // Send transaction
    // const signature = await connection.sendRawTransaction(versionedTransaction.serialize())
    // console.log("Versioned Transaction signature", signature);
}
