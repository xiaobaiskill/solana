import { VersionedTransaction, Transaction, Connection, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";
// 解析okx 的transaction data

const client = new Connection(clusterApiUrl("mainnet-beta"))

const serializedTransaction = "55EVgkDsgoDJzcufKMMcVZTQJVgR62eyodBfekkjAtZA9CPvGDWUF6gKJx3Kpu1Z5yiraZwecaFUetCYHzK3jjM54GZz4n9PENDa3G9cDuHyqyxzXacw3WnWuGKbcBE94MyUEYj84SJrF5JiELa4FThc8M7cPnqTqHHnwricCb4a4GsUmx6veuyJfepmSrtefTgTEaJ3SYgG6wXQ5yrB4EVoKmYR9mudHeLuaDxCNnDJ7xwVvMP7WewFQoe3WxPUGussRWraUAzjwhAki38nPYq1aRqv5Zp9wWTpQR3oKQKqdH28rEfLjqmoywTfpuGKEXL7f4gw39j1BS5Rn5j3knu83TRfAMVwxf17GVvGjKF3kTHviuna43ouhBoPpSkQASpBEEr48KxgPU2WXkv7pEC8BF6duBQB3x7cZ3ZkmMhN6LAuPCVEuyurRW4C17DgtwchEQ8pkvMBGw2nQhiG7xijKNUxgZTmYZvkktSsdT2HfVAfbvUmHieMaEpnyWoGA1RrWZHcNBvU4ypvYiMEgEdvTWp2cm7MVkSNNNJYBeb5BX6cA8kCevW2CadY1xetUTV6JS9DhEwrVexf6i7yhYFP2xKXqX77ZusLfe3UVKB2efVdhZMQsjJUeQcYAh25dtqtrrPNHskNFfPPg66HZ8uVjZ5WyfMTpCDscYv3C3gcsL2s1SfS5gfoe9LFvMW5PYRfv3P3G12AvThFMckyf1M4F41twh14egFYYggSrTAT4aVs5K7QQhzKuF6ekdnUUPfB7ow4PBJkRSuKjxHzydEYkG1cMuJznvQxE8JM7izSvYKVk4dzn6nQkJ7MkZoQCLQhDgVzVm5H8J2i8SGhE2aUSugrCCRWJobSgPboHXZmbBpuT66EgxLPcKzkgmFhuy2UdfVqVvjDUoHYGzzcJ2c7CvrLzAFhRdupqz4rigao8fFdr5WV7HKAk5q35yqKr8J4CQhyiV1wTKKg731csuWjiZE3qZ9a8t6g5X17ie8PtSL6Rj9nBg9mDhvGyB5woV2jS42CZGp6eLz7HWoMyuUz4o9gNWoGFweBbsAZ8z6nyhzBUhwQRBw46GBmxZHvzKTBXBaBoF9g1czdRZnTnp71fwqnT8TBp7geFbPKUXkPkhedghA51bwSTxBqGkPG4SuCux1CbCk"

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

