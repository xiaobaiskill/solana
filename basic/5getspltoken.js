import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getAssociatedTokenAddress, createAssociatedTokenAccount } from "@solana/spl-token";
import base58 from "bs58"
import "dotenv/config";
// 转移用户balance

// devnet client
const client = new Connection(clusterApiUrl("devnet"));

// 用户私钥
const keypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))
const owner = new PublicKey(keypair.publicKey)

// mint token (类似于erc20 token)
const mint = new PublicKey("12zvsv7ku497XkW8MH1DwsuGGRpqh8v5JBgE4DqdHzZy");

// // 获得 token account (每个wallet account 在 mint token 都有一个 token account)
// const tokenAccount = await getAssociatedTokenAddress(
//     mint,
//     owner
// )
// console.log(`token account: ${tokenAccount}`)


// // 检测钱包用户 是否 创建过 token account. 为null 时, 说明没有创建
// const info = await client.getAccountInfo(tokenAccount)
// if (info === null) {
//     // 创建token account
//     const mintATA = await createAssociatedTokenAccount(client, keypair, mint, owner)
//     console.log("create token account:", mintATA.toBase58())
// } else {
//     console.log("token info:", info)
// }

// // 获取token account 的 token余额
// const tokenAmount = await client.getTokenAccountBalance(tokenAccount)
// console.log("token amount:", tokenAmount.value)

const tokenAccount = await getTokenAmount(client, mint, owner)
if (tokenAccount == null) {
    await createAssociatedTokenAccount(client, keypair, mint, owner)
    console.log("token amount: 0",)
} else {
    console.log("token amount:", tokenAccount.value.uiAmount)
}


async function getTokenAmount(client, mint, owner) {
    const tokenAccount = await getAssociatedTokenAddress(
        mint,
        owner
    )

    const info = await client.getAccountInfo(tokenAccount)
    if (info == null) {
        return null
    } else {
        return await client.getTokenAccountBalance(tokenAccount)
    }
}