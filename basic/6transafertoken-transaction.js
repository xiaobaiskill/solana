import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl, VersionedTransaction, TransactionMessage } from "@solana/web3.js";
import { createTransferCheckedInstruction, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import base58 from "bs58"
import { Sleep } from "./common.js";
import "dotenv/config";


const client = new Connection(clusterApiUrl("devnet"));
const mint = new PublicKey("12zvsv7ku497XkW8MH1DwsuGGRpqh8v5JBgE4DqdHzZy");
const keypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))
const from = new PublicKey(keypair.publicKey)
const to = new PublicKey("HR9qkHSB52Fsm1y9VXUttjs2qkRJ5pGQvz6oSYikFu6T")

const unSignRawTransactoin = await getSendSplToken(client, mint, from, to, 10000)

const tx = VersionedTransaction.deserialize(Buffer.from(unSignRawTransactoin, 'hex'))
tx.sign([keypair])

console.log(await client.sendRawTransaction(tx.serialize()))

// console.log(await getTokenAmount(client, mint, from))


async function getSendSplToken(client, mint, from, to, amount) {
    const fromATA = await getAssociatedTokenAddress(
        mint,
        from
    )
    const fromInfo = await client.getAccountInfo(fromATA)
    if (fromInfo == null) {
        console.log("from not token accmount")
        return null
    }
    const fromTokenAccount = await client.getTokenAccountBalance(fromATA)
    if (fromTokenAccount.value.amount < amount) {
        console.log("余额不足")
        return null
    }
    console.log(fromTokenAccount)

    // 准备 transaction

    const transaction = new TransactionMessage({
        payerKey: from,
        recentBlockhash: (await client.getLatestBlockhash()).blockhash,
        instructions: []
    })

    const toATA = await getAssociatedTokenAddress(
        mint,
        to
    )
    const toInfo = await client.getAccountInfo(toATA)
    if (toInfo == null) {
        transaction.instructions.push(
            createAssociatedTokenAccountInstruction(
                from,
                toATA,
                to,
                mint,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            ))
    }

    transaction.instructions.push(
        createTransferCheckedInstruction(
            fromATA,
            mint,
            toATA,
            from,
            amount,
            fromTokenAccount.value.decimals,
            [],
            TOKEN_PROGRAM_ID
        ))

    let versionedTransaction = new VersionedTransaction(transaction.compileToV0Message())

    // return base58.encode(versionedTransaction.serialize())
    return Buffer.from(versionedTransaction.serialize()).toString("hex")
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