import { Connection, clusterApiUrl, Keypair, Transaction, VersionedTransaction, TransactionMessage, TransactionInstruction, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import base58 from "bs58";
import axios from "axios";
import { Buffer } from "buffer"
import "dotenv/config";
import { readFileSync } from "fs";
import { Sleep } from "./common.js";

import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";

function createWalletFromMnemonic(mnemonic) {
    const seed = mnemonicToSeedSync(mnemonic);
    const deriveSeed = derivePath(`m/44'/501'/0'/0'`, Buffer.from(seed).toString('hex')).key;
    return Keypair.fromSeed(deriveSeed);
}

const wallet = createWalletFromMnemonic(readFileSync("./mnemonic.txt", "utf-8"))
console.log(wallet.publicKey.toString())

var fromAddress = wallet.publicKey.toString()

const data = await getRango()

// console.log(data)
const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=00b13c7b-7179-429a-9921-658d5d8ca0cd");


const res = ToSerializeTransaction(data)

// console.log(res)

const TransactoinByte = base58.decode(res)


// try {
//     const transaction = Transaction.from(TransactoinByte)
//     console.log("legacy:", transaction)
//     transaction.partialSign(wallet)
//     // transaction.sign(wallet)
//     console.log("legacy:", base58.encode(transaction.serialize()))
//     console.log("verifySignatures: ", transaction.verifySignatures())

//     for (let i = 0; i < 30; i++) {
//         const tx = await connection.sendRawTransaction(transaction.serialize(), {
//             maxRetries: 3,
//         })
//         console.log(tx)
//         await Sleep(1000)
//     }

// } catch (error) {
//     console.log(error)

// 好像只需要这个就可以了 (似乎及支持legacy 也支持versioned)
const transaction = VersionedTransaction.deserialize(TransactoinByte)
transaction.sign([wallet])
console.log("versioned:", transaction)

// 老是不打包,需要重复发送n次,才行
for (let i = 0; i < 30; i++) {
    const tx = await connection.sendRawTransaction(transaction.serialize(), {
        maxRetries: 3,
    })
    console.log(tx)
    await Sleep(1000)
}

// }

function ToSerializeTransaction(data) {
    if (data.tx && data.tx.txType == "LEGACY") {
        const txMsg = new TransactionMessage({
            recentBlockhash: data.tx.recentBlockhash,
            payerKey: new PublicKey(data.tx.from),
            instructions: [],
        })

        for (let i = 0; i < data.tx.instructions.length; i++) {
            txMsg.instructions.push(getInstructions(data.tx.instructions[i]))
        }

        const tx = Transaction.populate(txMsg.compileToLegacyMessage())

        data.tx.signatures.forEach(signature => {
            tx.addSignature(new PublicKey(signature.publicKey), Buffer.from(signature.signature))
        });

        tx.feePayer = new PublicKey(data.tx.from)

        return base58.encode(tx.serialize({ requireAllSignatures: false }))
        // return Buffer.from(tx.serialize({ requireAllSignatures: false })).toString("hex")

    } else if (data.tx && data.tx.txType == "VERSIONED") {
        const tx = VersionedTransaction.deserialize(data.tx.serializedMessage)
        // const tx = new VersionedTransaction(data.tx.serializedMessage)
        // data.tx.signatures.forEach(signature => {
        //     tx.addSignature(new PublicKey(signature.publicKey), Buffer.from(signature.signature))
        // });
        // tx.feePayer = new PublicKey(data.tx.from)
        // console.log(tx)

        return base58.encode(tx.serialize())
        // return Buffer.from(data.tx.serializedMessage).toString("hex")
    }
}

function getInstructions(data) {
    let instruction = new TransactionInstruction({
        programId: new PublicKey(data.programId),
        data: Buffer.from(data.data),
        keys: []
    })
    for (let j = 0; j < data.keys.length; j++) {
        instruction.keys.push(
            {
                pubkey: new PublicKey(data.keys[j].pubkey),
                isSigner: data.keys[j].isSigner,
                isWritable: data.keys[j].isWritable
            }
        )
    }
    return instruction
}
async function getRango() {
    // LEGACY
    // const response = await axios.get(`https://api.rango.exchange/basic/swap?from=SOLANA.SOL&to=BSC.BNB&amount=100000000&slippage=8&fromAddress=${fromAddress}&toAddress=0xE10190Ba0747c7c13b04a349E50F518B5e179B04&apiKey=c6381a79-2817-4602-83bf-6a641a409e32`);

    // VersionedTransaction
    const response = await axios.get(`https://api.rango.exchange/basic/swap?from=SOLANA.SOL&to=SOLANA.SLERF--7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3&fromAddress=${fromAddress}&toAddress=${fromAddress}&amount=30000000&slippage=0.5&apiKey=c6381a79-2817-4602-83bf-6a641a409e32`)
    return response.data
}