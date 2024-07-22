
import solanaWeb3, { PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import base58 from "bs58";
import { sign } from "crypto";
import "dotenv/config";


// https://solscan.io/tx/217i15JPriGAKR56dNqzjkdeki8DA6FE72JcXoyD5QDPd2beEDJVYgWUeab7aNn1zx2964N6rwUWKm83D5ZjR4Aq
const connection = new solanaWeb3.Connection(clusterApiUrl("mainnet-beta"), "confirmed");


getMintAuthority()
// getAssociatedBondingCurve()


// 1 get mint
async function getMintAddress() {

}

// 2、get Mint Authority
async function getMintAuthority() {
    const mintAddres = new PublicKey("2WMY1ishGato1dTjP2bCBg6eTANXcY2ETugjx1dADsPt")

    const res = await splToken.getMint(connection, mintAddres)

    console.log("Mint Authority:", res.mintAuthority.toBase58())
}


//  3、 get  Associated Bonding Curve
async function getAssociatedBondingCurve() {
    const mintAddres = new PublicKey("2WMY1ishGato1dTjP2bCBg6eTANXcY2ETugjx1dADsPt")

    // Bonding Curve
    const owner = new PublicKey("2tBKG2TvpjEixJCoteP3FHQ9sbnfeCPwxFL5xQyoWNss")

    const res = await splToken.getAssociatedTokenAddress(mintAddres, owner, true)

    console.log("Associated Bonding Curve:", res.toBase58())
}