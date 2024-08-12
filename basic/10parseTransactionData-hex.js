import { VersionedTransaction, Transaction, Connection, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";
// 解析okx 的transaction data

const client = new Connection(clusterApiUrl("mainnet-beta"))

// raw transaction
const serializedTransaction = "013081cc649032ea8b42f2e9bfbbb0ec9be3cfc473800033c42c12abead1cd5b494f2bcb201945a0ce82654af59ac733264b3386291905e86d3e47c47edcaada018001000609b0575c404336c86d561f1fb77e30d4155cbf564062419fe07f39501a3ad5ae5c8df53fa118dc6a0beb869f396305b03378e4131d1fc682197e3726c21e029468b51ef4115c61911c91713a0e93d3508882ef02eb3b3786a854302996e754e9a2f5896913cb52d9f5dbd82bdea4269b300ce406304006ccfe044c9f192730b4e7000000000000000000000000000000000000000000000000000000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a90306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a400000008c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f859559156f1a25c6d134f2af7e60a9a0d347ec79156636462d5d1ad26f135348f69fac93425e611157beb13e412ebfe4051229fa6ed118f80bbec96a2ad92a1bf450906000502383e020006000903663c060000000000040200016903000000b0575c404336c86d561f1fb77e30d4155cbf564062419fe07f39501a3ad5ae5c0d0000000000000031373233343331373335343638f01d1f0000000000a50000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a90504011600140101040200010c0200000000ca9a3b000000000501010111070600020003040501010818000102160318000102050e170f090c12150a1310110d0b1746414b3f4ceb5b5b8800ca9a3b00000000daea9acfde8a0000bf72874d7b8900000100000000ca9a3b00000000010000000100000001000000040100000064b39501000000000005030100000109020c43307868fe6bab7de484c673a03f3d1bc3749efcc310891b8445ae29168b450b62636465666768696a6b6c005474733286fc93fd9a4fa410bb01793d7a6d14c9093dbcfc289b0546c68dc5dd0005011229190e"

const TransactoinByte = Buffer.from(serializedTransaction, "hex")

console.log(base58.encode(TransactoinByte))

// let transaction

// try {
//     transaction = Transaction.from(TransactoinByte)
//     console.log("legacy:", transaction)
// } catch (error) {
//     transaction = VersionedTransaction.deserialize(TransactoinByte)
//     console.log("versioned:", transaction)
// }




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

