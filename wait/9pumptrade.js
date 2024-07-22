import axios from 'axios';
import { Connection, LAMPORTS_PER_SOL, PublicKey, VersionedTransaction, } from "@solana/web3.js"
import { createMint, getMint, createAssociatedTokenAccount, getAssociatedTokenAddress, mintToChecked, mintTo, transferChecked } from "@solana/spl-token";
import base58 from "bs58";

export default async function getCoinData(mintStr) {
    try {
        const url = `https://frontend-api.pump.fun/coins/${mintStr}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
                Accept: '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                Referer: 'https://www.pump.fun/',
                Origin: 'https://www.pump.fun',
                Connection: 'keep-alive',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'If-None-Match': 'W/"43a-tWaCcS4XujSi30IFlxDCJYxkMKg"'
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to retrieve coin data:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coin data:', error);
        return null;
    }
}

export async function getTradeTransaction() {
    try {
        const response = await axios.post("https://pumpapi.fun/api/trade_transaction",
            {
                trade_type: "sell",
                mint: "2WMY1ishGato1dTjP2bCBg6eTANXcY2ETugjx1dADsPt",
                amount: 39341411100,
                slippage: 1,
                priorityFee: 1,
                userPublicKey: "HR9qkHSB52Fsm1y9VXUttjs2qkRJ5pGQvz6oSYikFu6T"
            }
        )
        if (response.status === 200) {
            return response.data
        }
        else {
            console.error("Failed to get transaction", response.status);
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching get transaction", error);
        return null
    }
}



// const data = await getCoinData("4XjmRidirDYiBLMoVvmaRkmhYoUzic5Foir9RHAxpump")
// console.log(data)

// // sol to token
// const solInLamports = 1000000000;
// const tokenOut = Math.floor((solInLamports * data['virtual_token_reserves']) / data['virtual_sol_reserves']);
// console.log(`${solInLamports / LAMPORTS_PER_SOL} sol can exchange for ${tokenOut / 1000000} ${data["symbol"]}`)



// const data = await getTradeTransaction();

// const transaction = VersionedTransaction.deserialize(base58.decode(data["transaction"]));
// console.log(transaction);

// console.log(transaction.message.compiledInstructions)

















// ------------------ other -------------------

// 创建连接到 Solana mainnet
const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    'confirmed'
);

const token = new PublicKey("4XjmRidirDYiBLMoVvmaRkmhYoUzic5Foir9RHAxpump");
const user = new PublicKey("5UsM886yuxbcNuKieLMsyZ1j5RfXDMAP1A5qjp7zSdTD")
const ATA = await getAssociatedTokenAddress(token, user)
console.log(`mint ata: ${ATA.toBase58()}`);


// // 获取 子账户 的 账户信息
// const accountInfo = await connection.getAccountInfo(ATA)
// console.log("account:", accountInfo)


// const tokenAccountInfo = await connection.getTokenAccountBalance(ATA)
// console.log("token account:", tokenAccountInfo)
