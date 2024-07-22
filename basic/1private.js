import { Keypair } from "@solana/web3.js";
import base58 from "bs58"


// 创建私钥
const keypair = Keypair.generate();

console.log(keypair);

console.log(`The public key is: `, keypair.publicKey.toBase58())

// 数组型
console.log(`The private key is: , [${keypair.secretKey.toString()}]`)

// 字符串型
console.log(`The private key is: , ${base58.encode(keypair.secretKey)}`)
