import { Connection, VersionedTransaction, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import base58 from "bs58"
import "dotenv/config";
// 转移用户balance

// devnet client
const client = new Connection(clusterApiUrl("mainnet-beta"));
const lastBlockHash = await client.getLatestBlockhash()

const serializedTransaction = "hybkQoDZcwawWU282co3VvuCNpfkNZTyG9JwZaFAjzTXGEwCribnXUXUqjVNrXE7yxXqVdMTLz6YbJJnHZS64p1YjAASVGFj77fFMcK7QZBLa6s5urSpF6BC4NVoxVxrBbpzfpKpKTtjCtzBCUnowwa6G2Q6RR7He8i9m7AQCJk9uMbn8mHkHu4igmQVrw8YxeGPab2pLHUSsNVEsXhvi3NUvapme8rMgnMjnP7vzbyF8gSG6C9Dvx9MwJjFS4whTjYgrjTa3JRj8ZUJcoXJMo9wi5yuoGTkpU9CeqKEkZ8PpeXxViGY71LqW5N3TJVHW3tLLmrmjmWz9Q3vAZnUPTL9SESEpNzATy54F1thx9VmAnmBmuYqSoTxuABfd8bJbbrDNjLnAT7itN1KJjBpJ9cWhEoj93rzfKMseUZS568NvACpfHnfUSWavWv6CQiHM7UCrhSrJ7kfCjMZC77f8toWMuVmyUKMn6WJ5JvR91tYodB6eCbPRVxxYN1UBAYkDrT4wA8HZv66f3LtR7reoQzxpwNmskaMamVoKhXGg7bDzu1PpPr3onuPjeBn6fpaYP1XnL78QtUU4tzrkJi6cCYyGFETxuucsHVqn9y4RiNCVbFCnuBUExmTVsp4yDUpoFyncGY7r6JjmR6xciUYxGb9jH8wz4XKBkt4NFK14YiYb5SxzDSXJvJ7Kwf4vdNNSdBDo49xJmJTy3VgzRSAuZDQp3PH1AfwukwCt6SRWPmgCdTM6kNZFC6G4NALMo9iFjdkkaHKcUELKnJwzg9gg47Daw7u6Y95GcCYan5Nje4ADAY7NRcr4ebcZCiVNDs4ezkNruN9kK39zMya8To7dsDUPL7GeaC1sG1ehNettu9PrsmGkADTLp8RZXL6jxHjdjNnvU9QEhWMacXsuM4ap5ES472wBsbYhB5QPP1YaNecGzNEJycAzRqZuNkc6kDexDtjRN2sk2ALDTVLmqGk5yG8d2Wn2gsxJUwGWK4sDmxoT91QNr3NzE7vqxxrG9j"
const TransactoinByte = base58.decode(serializedTransaction)

let transaction;

try {
    transaction = Transaction.from(TransactoinByte)
    transaction.recentBlockhash = lastBlockHash.blockhash
    // console.log(transaction)

} catch (error) {
    console.log(error)
    transaction = VersionedTransaction.deserialize(TransactoinByte)
    transaction.message.recentBlockhash = lastBlockHash.blockhash
    // console.log(transaction)
}



// const res = await client.simulateTransaction(transaction)

// console.log(res)


// let txid = await client.sendRawTransaction(transaction.serialize())
// console.log("transaction id:", txid)