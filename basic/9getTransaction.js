import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("mainnet-beta"));

const tx = "5S3bP624sFkKYFQN1mnb7wTRtNbmTUwV1YFnrZ7G24CApVmcsFcfVTbgFWgrsasqn5K9WkMApYimpcBYsSQMVR2j"

const res = await connection.getParsedTransaction(tx)
console.log(res)

console.log(res.meta.err)