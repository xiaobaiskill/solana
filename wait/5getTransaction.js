import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";

const client = new Connection(clusterApiUrl("mainnet-beta"));

const res = await client.getTransaction(
    "5ubdeJEJjkFznS39vrPJKKtbt2QikFDJuhS3KvZ6k89hWHKQi5CwwVwfhmof1psQqcDK7J7H8fyyDDYNTf9QAgvm",
    { maxSupportedTransactionVersion: 0 }
);

console.log(res.transaction.message.staticAccountKeys);
console.log(res.transaction.message.compiledInstructions);