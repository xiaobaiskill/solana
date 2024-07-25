import { VersionedTransaction, Transaction, Connection, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";
// 解析okx 的transaction data

const client = new Connection(clusterApiUrl("mainnet-beta"))

const serializedTransaction = "E3cqE89t5PMHL1KorzdJScrGm6TiKhprP5EGuXzyCWgQjBJVUQVxLYFefzwRjwWFJANiXnndE61HkxT1vG14JeCs8L3PNrrcVV7qVrchL4CqJyw2fbgoPh25aZonSajsjCNBzMbhiRkzGDHxi6hurzgDfNg2vmftdwXoSQ7jwGND6Ebvva3Uo9"

const TransactoinByte = base58.decode(serializedTransaction)

let transaction

try {
    transaction = Transaction.from(TransactoinByte)
    console.log("legacy:", transaction)
} catch (error) {
    transaction = VersionedTransaction.deserialize(TransactoinByte)
    console.log("versioned:", transaction)
}




// const recentBlockhash = await client.getLatestBlockhash()

// if (transaction instanceof VersionedTransaction) {
//     transaction.message.recentBlockhash = recentBlockhash.blockhash;
//     // transaction.sign([fromSecretKey])
// } else {
//     transaction.recentBlockhash = recentBlockhash.blockhash
//     // transaction.partialSign(fromSecretKey)
// }

// console.log(transaction)

// console.log(base58.encode(transaction.serializeMessage()))

