import { Connection, Keypair, PublicKey, clusterApiUrl, VersionedTransaction } from "@solana/web3.js";
import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, transferChecked } from "@solana/spl-token";
import base58 from "bs58"
import { Sleep } from "./common.js";
import "dotenv/config";
// 转移用户balance

// devnet client
const client = new Connection(clusterApiUrl("devnet"));

// mint token (类似于erc20 token)
const mint = new PublicKey("12zvsv7ku497XkW8MH1DwsuGGRpqh8v5JBgE4DqdHzZy");

// 用户私钥
const keypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))
const owner = new PublicKey(keypair.publicKey)

// receiver
const receiver = new PublicKey("Fo5ZfQtosBjzfwGUDhxVQ6dHow7fG9hLtcv7kHP5BD82")


// 检测 sender 和 receiver 是否有token account


// 获取 token account
const fromATA = await getAssociatedTokenAddress(
    mint,
    owner
)

const toATA = await getAssociatedTokenAddress(
    mint,
    receiver
)
const frominfo = await client.getAccountInfo(fromATA)
if (frominfo == null) {
    console.log("sender 链 token account 都没有怎么可能有token 呢")
}

const toinfo = await client.getAccountInfo(toATA)
if (toinfo == null) {
    // 由 sender 给 receiver 创建一个 token account
    await createAssociatedTokenAccount(client, keypair, mint, receiver)
}

// 这里可能要等几秒钟,, 不然创建好token account 后, 无法立即拿到token amount 信息 
await Sleep(1000);
// 获取transfer 之前的token amount
let fromTokenAmount = await client.getTokenAccountBalance(fromATA)
let toTokenAmount = await client.getTokenAccountBalance(toATA)
console.log(`before sender: ${owner}, token amount: ${fromTokenAmount.value.uiAmount}`)
console.log(`before sender: ${receiver}, token amount: ${toTokenAmount.value.uiAmount}`)

// // transfer
const toHash = await transferChecked(client, keypair, fromATA, mint, toATA, owner, 2000000000, 9)
console.log("transfer spl token tx hash:", toHash)

await Sleep(3000);

// 获取transfer 之后的token amount
fromTokenAmount = await client.getTokenAccountBalance(fromATA)
toTokenAmount = await client.getTokenAccountBalance(toATA)
console.log(`before sender: ${owner}, token amount: ${fromTokenAmount.value.uiAmount}`)
console.log(`before sender: ${receiver}, token amount: ${toTokenAmount.value.uiAmount}`)
