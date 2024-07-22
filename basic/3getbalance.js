import { Keypair, PublicKey, Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";
// 获取用户balance

// devnet client 
const devClient = new Connection(clusterApiUrl("devnet"));

const keypair = Keypair.fromSecretKey(
    base58.decode(process.env.SECRET_KEY)
)
const addr = new PublicKey(keypair.publicKey.toBase58())
console.log(`the public key is ${addr}`)

// dev 获取 一些原生币用于测试 (只有dev 环境可用)
const tx = await devClient.requestAirdrop(addr, 1000000000)
console.log(`airdrop tx: ${tx}`,)

// 获取balance 
const balance = await devClient.getBalance(addr)
console.log(`addr : ${keypair.publicKey.toBase58()} --  balance : ${balance / LAMPORTS_PER_SOL}`)