import { Transaction, VersionedTransaction, TransactionMessage, TransactionInstruction, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import axios from "axios";
import "dotenv/config";

// const data = await getRango()
// console.log(data)

// const data = {
//     requestId: '97e2de00-8c16-44b2-ab84-f54d627bcdb7',
//     resultType: 'OK',
//     route: {
//         outputAmount: '6199000000000000',
//         outputAmountMin: '6168004999999999',
//         outputAmountUsd: 20.740818259460507,
//         swapper: {
//             id: 'Bridgers',
//             title: 'Bridgers',
//             logo: 'https://raw.githubusercontent.com/rango-exchange/assets/main/swappers/Bridgers/icon.svg',
//             swapperGroup: 'Bridgers',
//             types: ['DEX', 'BRIDGE'],
//             enabled: true
//         },
//         from: {
//             blockchain: 'SOLANA',
//             symbol: 'SOL',
//             name: null,
//             isPopular: false,
//             chainId: 'mainnet-beta',
//             address: null,
//             decimals: 9,
//             image: 'https://rango.vip/tokens/ALL/SOL.png',
//             blockchainImage:
//                 'https://raw.githubusercontent.com/rango-exchange/assets/main/blockchains/SOLANA/icon.svg',
//             usdPrice: 193.13248868753178,
//             supportedSwappers: []
//         },
//         to: {
//             blockchain: 'ARBITRUM',
//             symbol: 'ETH',
//             name: null,
//             isPopular: false,
//             chainId: '42161',
//             address: null,
//             decimals: 18,
//             image: 'https://rango.vip/tokens/ALL/ETH.png',
//             blockchainImage:
//                 'https://raw.githubusercontent.com/rango-exchange/assets/main/blockchains/ARBITRUM/icon.svg',
//             usdPrice: 3345.832918125586,
//             supportedSwappers: []
//         },
//         fee: [
//             {
//                 token: {
//                     blockchain: 'SOLANA',
//                     symbol: 'SOL',
//                     name: 'SOL',
//                     isPopular: true,
//                     chainId: 'mainnet-beta',
//                     address: null,
//                     decimals: 9,
//                     image: 'https://rango.vip/tokens/ALL/SOL.png',
//                     blockchainImage:
//                         'https://raw.githubusercontent.com/rango-exchange/assets/main/blockchains/SOLANA/icon.svg',
//                     usdPrice: 193.13248868753178,
//                     supportedSwappers: [
//                         'XO Swap',
//                         'Jupiter',
//                         'SolanaWrapper',
//                         'SWFT',
//                         'DeBridge',
//                         'Bridgers'
//                     ]
//                 },
//                 expenseType: 'FROM_SOURCE_WALLET',
//                 amount: '145000',
//                 name: 'Network Fee'
//             },
//             {
//                 token: {
//                     blockchain: 'SOLANA',
//                     symbol: 'SOL',
//                     name: 'SOL',
//                     isPopular: true,
//                     chainId: 'mainnet-beta',
//                     address: null,
//                     decimals: 9,
//                     image: 'https://rango.vip/tokens/ALL/SOL.png',
//                     blockchainImage:
//                         'https://raw.githubusercontent.com/rango-exchange/assets/main/blockchains/SOLANA/icon.svg',
//                     usdPrice: 193.13248868753178,
//                     supportedSwappers: [
//                         'XO Swap',
//                         'Jupiter',
//                         'SolanaWrapper',
//                         'SWFT',
//                         'DeBridge',
//                         'Bridgers'
//                     ]
//                 },
//                 expenseType: 'DECREASE_FROM_OUTPUT',
//                 amount: '330000',
//                 name: 'Swapper Fee'
//             }
//         ],
//         feeUsd: 0.028004210859692107,
//         amountRestriction: {
//             min: '103558000',
//             max: '98536269000',
//             type: 'EXCLUSIVE'
//         },
//         estimatedTimeInSeconds: 300,
//         path: [
//             {
//                 swapper: {
//                     id: 'Bridgers',
//                     title: 'Bridgers',
//                     logo: 'https://raw.githubusercontent.com/rango-exchange/assets/main/swappers/Bridgers/icon.svg',
//                     swapperGroup: 'Bridgers',
//                     types: ['DEX', 'BRIDGE'],
//                     enabled: true
//                 },
//                 swapperType: 'BRIDGE',
//                 from: {
//                     blockchain: 'SOLANA',
//                     symbol: 'SOL',
//                     name: null,
//                     isPopular: false,
//                     chainId: 'mainnet-beta',
//                     address: null,
//                     decimals: 9,
//                     image: 'https://rango.vip/tokens/ALL/SOL.png',
//                     blockchainImage:
//                         'https://raw.githubusercontent.com/rango-exchange/assets/main/blockchains/SOLANA/icon.svg',
//                     usdPrice: 193.13248868753178,
//                     supportedSwappers: []
//                 },
//                 to: {
//                     blockchain: 'ARBITRUM',
//                     symbol: 'ETH',
//                     name: null,
//                     isPopular: false,
//                     chainId: '42161',
//                     address: null,
//                     decimals: 18,
//                     image: 'https://rango.vip/tokens/ALL/ETH.png',
//                     blockchainImage:
//                         'https://raw.githubusercontent.com/rango-exchange/assets/main/blockchains/ARBITRUM/icon.svg',
//                     usdPrice: 3345.832918125586,
//                     supportedSwappers: []
//                 },
//                 inputAmount: '110000000',
//                 expectedOutput: '6199000000000000',
//                 estimatedTimeInSeconds: 300
//             }
//         ]
//     },
//     error: null,
//     errorCode: null,
//     traceId: null,
//     tx: {
//         type: 'SOLANA',
//         blockChain: 'SOLANA',
//         from: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//         identifier: 'swapSol',
//         instructions: [
//             {
//                 keys: [],
//                 programId: 'RangohQxaWip6i1twAAnRVLmob9j88fid7sq2DMAATW',
//                 data: [
//                     123, 34, 114, 101, 113, 117, 101, 115, 116, 73, 100, 34, 58, 34, 57,
//                     55, 101, 50, 100, 101, 48, 48, 45, 56, 99, 49, 54, 45, 52, 52, 98, 50,
//                     45, 97, 98, 56, 52, 45, 102, 53, 52, 100, 54, 50, 55, 98, 99, 100, 98,
//                     55, 34, 44, 34, 115, 116, 101, 112, 115, 34, 58, 49, 44, 34, 100, 97,
//                     112, 112, 84, 97, 103, 34, 58, 49, 48, 54, 125
//                 ]
//             },
//             {
//                 keys: [
//                     {
//                         pubkey: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//                         isSigner: true,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'ASY9i2dhQegarXCM6RuRiE3FDQptJFNTc1XZFhrcQ4KJ',
//                         isSigner: true,
//                         isWritable: true
//                     }
//                 ],
//                 programId: '11111111111111111111111111111111',
//                 data: [
//                     0, 0, 0, 0, -16, 29, 31, 0, 0, 0, 0, 0, -91, 0, 0, 0, 0, 0, 0, 0, 6,
//                     -35, -10, -31, -41, 101, -95, -109, -39, -53, -31, 70, -50, -21, 121,
//                     -84, 28, -76, -123, -19, 95, 91, 55, -111, 58, -116, -11, -123, 126,
//                     -1, 0, -87
//                 ]
//             },
//             {
//                 keys: [
//                     {
//                         pubkey: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//                         isSigner: true,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'ASY9i2dhQegarXCM6RuRiE3FDQptJFNTc1XZFhrcQ4KJ',
//                         isSigner: false,
//                         isWritable: true
//                     }
//                 ],
//                 programId: '11111111111111111111111111111111',
//                 data: [2, 0, 0, 0, -128, 119, -114, 6, 0, 0, 0, 0]
//             },
//             {
//                 keys: [
//                     {
//                         pubkey: 'ASY9i2dhQegarXCM6RuRiE3FDQptJFNTc1XZFhrcQ4KJ',
//                         isSigner: false,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'So11111111111111111111111111111111111111112',
//                         isSigner: false,
//                         isWritable: false
//                     },
//                     {
//                         pubkey: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//                         isSigner: false,
//                         isWritable: false
//                     },
//                     {
//                         pubkey: 'SysvarRent111111111111111111111111111111111',
//                         isSigner: false,
//                         isWritable: false
//                     }
//                 ],
//                 programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
//                 data: [1]
//             },
//             {
//                 keys: [
//                     {
//                         pubkey: 'ASY9i2dhQegarXCM6RuRiE3FDQptJFNTc1XZFhrcQ4KJ',
//                         isSigner: false,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//                         isSigner: true,
//                         isWritable: false
//                     },
//                     {
//                         pubkey: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
//                         isSigner: false,
//                         isWritable: false
//                     },
//                     {
//                         pubkey: 'EESVeBZXR4tfzkaGzu9SiH4CN8U6bBHTBVkj2YetJGKY',
//                         isSigner: false,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'CYEzny8orBXUamdCJBkLKmNu5fCKi9GwFZUTA1Nvt8s6',
//                         isSigner: false,
//                         isWritable: false
//                     }
//                 ],
//                 programId: 'AL89We2CN1RdEJhUAtUs8ZhdQhkdECg6WX6qq7QntoWH',
//                 data: [
//                     2, -128, 119, -114, 6, 0, 0, 0, 0, 42, 0, 0, 0, 48, 120, 101, 101,
//                     101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101,
//                     101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101,
//                     101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 44, 0, 0, 0, 71,
//                     106, 54, 69, 49, 111, 83, 111, 67, 86, 54, 54, 65, 100, 110, 121, 111,
//                     81, 66, 101, 74, 120, 52, 74, 103, 101, 97, 117, 117, 56, 83, 53, 109,
//                     109, 66, 100, 87, 67, 52, 68, 115, 90, 120, 122, 16, 0, 0, 0, 54, 49,
//                     57, 57, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 15, 0, 0, 0,
//                     69, 84, 72, 40, 65, 82, 66, 41, 124, 103, 109, 104, 110, 57, 107, 42,
//                     0, 0, 0, 48, 120, 52, 98, 51, 53, 50, 52, 102, 55, 55, 49, 99, 57, 52,
//                     100, 100, 57, 53, 100, 50, 53, 100, 99, 49, 100, 50, 49, 98, 97, 100,
//                     56, 99, 48, 102, 52, 53, 55, 57, 101, 97, 101
//                 ]
//             },
//             {
//                 keys: [
//                     {
//                         pubkey: 'ASY9i2dhQegarXCM6RuRiE3FDQptJFNTc1XZFhrcQ4KJ',
//                         isSigner: false,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//                         isSigner: false,
//                         isWritable: true
//                     },
//                     {
//                         pubkey: 'Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz',
//                         isSigner: true,
//                         isWritable: false
//                     }
//                 ],
//                 programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
//                 data: [9]
//             }
//         ],
//         recentBlockhash: '9VGoXjrEHv1rYXGK5zp1LuK9vPHeKHaBB1zYdZFn2bPb',
//         signatures: [
//             {
//                 publicKey: 'ASY9i2dhQegarXCM6RuRiE3FDQptJFNTc1XZFhrcQ4KJ',
//                 signature: [
//                     -68, -23, 62, -126, -44, -77, 118, -10, -67, 125, 0, 80, -88, -37, 69,
//                     -18, -128, -100, -5, -89, 86, -53, 93, 101, 31, -45, 118, 126, -54,
//                     21, -69, 103, -38, 62, -21, -90, 124, -85, -124, -108, 13, 122, 111,
//                     -74, 103, 94, -102, 94, 16, -97, -102, 105, -124, -67, -19, 31, 118,
//                     -114, -3, 14, -13, -92, -39, 13
//                 ]
//             }
//         ],
//         serializedMessage: null,
//         txType: 'LEGACY',
//         type: 'SOLANA'
//     }
// }

const data = await getRango()

// console.log(data)

const res = ToSerializeTransaction(data)

console.log(res)


function ToSerializeTransaction(data) {
    const txMsg = new TransactionMessage({
        // recentBlockhash: data.tx.recentBlockhash,
        payerKey: new PublicKey(data.tx.from),
        instructions: [],
    })

    for (let i = 0; i < data.tx.instructions.length; i++) {
        txMsg.instructions.push(getInstructions(data.tx.instructions[i]))
    }


    if (data.tx && data.tx.txType == "LEGACY") {
        const tx = Transaction.populate(txMsg.compileToLegacyMessage())

        data.tx.signatures.forEach(signature => {
            tx.addSignature(new PublicKey(signature.publicKey), Buffer.from(signature.signature))
        });

        return base58.encode(tx.serialize({ requireAllSignatures: false }))
    } else if (data.tx && data.tx.txType == "VERSIONED") {
        const tx = VersionedTransaction.deserialize(data.tx.serializedMessage)
        // const tx = new VersionedTransaction(data.tx.serializedMessage)
        // data.tx.signatures.forEach(signature => {
        //     tx.addSignature(new PublicKey(signature.publicKey), Buffer.from(signature.signature))
        // });
        tx.feePayer = new PublicKey(data.tx.from)

        return base58.encode(tx.serialize())
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
    // const response = await axios.get(`https://api.rango.exchange/basic/swap?from=SOLANA.SOL&to=ARBITRUM.ETH&fromAddress=Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz&toAddress=0x4b3524f771c94dd95d25dc1d21bad8c0f4579eae&amount=110000000&slippage=0.5&apiKey=c6381a79-2817-4602-83bf-6a641a409e32`);
    const response = await axios.get("https://api.rango.exchange/basic/swap?from=SOLANA.SOL&to=SOLANA.SLERF--7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3&fromAddress=Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz&toAddress=Gj6E1oSoCV66AdnyoQBeJx4Jgeauu8S5mmBdWC4DsZxz&amount=40000000&slippage=0.5&apiKey=c6381a79-2817-4602-83bf-6a641a409e32")
    return response.data
}