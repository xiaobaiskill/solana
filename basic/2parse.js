import { Keypair } from "@solana/web3.js";
import base58 from "bs58"
import { readFileSync } from "fs";
import { Buffer } from "buffer";
// 读取钱包私钥

// 全局变量 读取, 配合.env 使用
import "dotenv/config"

const userKeyPair1 = Keypair.fromSecretKey(
    base58.decode(readFileSync("./private_str.txt", "utf-8"))
);

console.log(`the public key1 is: ${userKeyPair1.publicKey.toBase58()}`)


const userKeyPair2 = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(readFileSync("./private_arr.json", "utf-8")))
);

console.log(`the public key2 is: ${userKeyPair2.publicKey.toBase58()}`)


const userKeyPair3 = Keypair.fromSecretKey(
    base58.decode(process.env.SECRET_KEY)
);
console.log(`the public key3 is: ${userKeyPair3.publicKey.toBase58()}`)
