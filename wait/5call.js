import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from "@solana/web3.js";
import base58 from "bs58";
import { sign } from "crypto";
import "dotenv/config";

// init client 
const client = new Connection("https://api.devnet.solana.com");

// get keypair
const keypair = Keypair.fromSecretKey(
    base58.decode(process.env.SECRET_KEY)
)

// add transaction
const transaction = new Transaction();
transaction.add(new TransactionInstruction({
    keys: [],
    programId: new PublicKey("BiSSsdDEGyt7gai4Er5v8TBTg6ERd2swpH7o9jifXQzP"),
}))


// exec transaction
const signature = await sendAndConfirmTransaction(client, transaction, [keypair])

// output tx
console.log(`transaction sent with hash: ${signature}`)

// ---------------------- solana contract ------------------------
// 合约是可以升级的
/*
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("hello web3!");

    Ok(())
}
*/