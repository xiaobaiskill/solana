
import solanaWeb3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import base58 from "bs58";
import { sign } from "crypto";
import "dotenv/config";

// 创建连接到 Solana devnet
const connection = new solanaWeb3.Connection(
    "https://api.mainnet-beta.solana.com",
    'confirmed'
);

const fromWallet = solanaWeb3.Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY));


// 要进行交易的目标钱包地址（假设已知）
const toWalletPublicKey = new solanaWeb3.PublicKey('7WmRN3hUYg7gwVw7fw9Q9DCsX2fLM88UsnUsiC6rdFTJ');

// 从环境变量或配置文件加载 token 地址
const tokenMintAddress = new solanaWeb3.PublicKey('DVbNTGFdvCq8WoLoBEkha53w86fzmD6h1ubQn195pump');

// 创建或者获取 fromWallet 的 token 账户
let fromTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    tokenMintAddress,
    fromWallet.publicKey
);

console.log(`from wallet token account: ${fromTokenAccount.address}`)

// // 创建或者获取 toWallet 的 token 账户
// let toTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
//     connection,
//     fromWallet,
//     tokenMintAddress,
//     toWalletPublicKey
// );

// console.log(`to wallet token account: ${toTokenAccount.address}`)

// // 假设我们要转移 10 个 Token
// const amount = 10 * Math.pow(10, 9); // 以最小单位表示，例如 10 个 Token = 10 * 10^9

// // 创建并发送转移交易
// const transaction = new solanaWeb3.Transaction().add(
//     splToken.createTransferInstruction(
//         fromTokenAccount.address,
//         toTokenAccount.address,
//         fromWallet.publicKey,
//         amount,
//         [],
//         splToken.TOKEN_PROGRAM_ID
//     )
// );

// console.log(`transaction: ${transaction}}`)

// // 签名并发送交易
// const signature = await solanaWeb3.sendAndConfirmTransaction(
//     connection,
//     transaction,
//     [fromWallet]
// );

// console.log('Transaction signature', signature);
