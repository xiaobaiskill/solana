import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"
import { createMint, getMint, createAssociatedTokenAccount, getAssociatedTokenAddress, mintToChecked, mintTo, transferChecked } from "@solana/spl-token";
import base58 from "bs58"
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

const pay = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))

// // 创建新的Token代币
// const token = await createMint(
//     connection, // conneciton
//     pay, // fee payer
//     pay.publicKey, // mint authority 
//     pay.publicKey, // freeze authority 
//     6 // decimals
// )
// console.log(`mint address: ${token.toBase58()}`)
const token = new PublicKey("EkUdG1fSriPhKeNwRCrJ65jhyYerfEwcJPqKnUhM4Ho9");

// // 获取发行代币信息
// const mint = await getMint(connection, token)
// console.log(`mint address info: \n`, mint)

// // 创建token子账户.. 第一次使用时需要创建
// const associatedTokenAccount = await createAssociatedTokenAccount(
//     connection,
//     pay,
//     token,
//     pay.publicKey
// )
// console.log(`create associated token account: `, associatedTokenAccount)

// //获取pay的这个代币子账号
const mintATA = await getAssociatedTokenAddress(token, pay.publicKey)
console.log(`mint ata: ${mintATA.toBase58()}`);

// 将代币mint 如 pay 的子账号中
const mintAmount = 1000000000; // 实际铸造的数量 100 token

const txhash = await mintTo(
    connection,
    pay,
    token,
    mintATA,
    pay.publicKey,
    mintAmount
)
console.log(`mint txhash: ${txhash}`)


////////////////////////////////////  transfer   ////////////////////////////////////////


// transfer token to receiver

const receiver = new PublicKey("66SaG9rjVZeQrvQdKiQYrqJGTCBHzcZMxgE1Ziwt2t9j")

// 为接收者创建token子账户
// const associatedTokenAccount = await createAssociatedTokenAccount(
//     connection,
//     pay,
//     token,
//     receiver
// )
// console.log(`create associated token account: `, associatedTokenAccount)

const toATA = await getAssociatedTokenAddress(token, receiver)
console.log("receiver ATA:", toATA.toBase58())

// 向接收者 转账
const toHash = await transferChecked(connection, pay, mintATA, token, toATA, pay, 2000000, 6)
console.log("transfer tx hash:", toHash)

