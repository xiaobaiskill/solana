import { fetchDigitalAsset, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { PublicKey, clusterApiUrl } from "@solana/web3.js";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

const umi = createUmi(clusterApiUrl("mainnet-beta")).use(mplTokenMetadata())
const mint = new PublicKey("4n7AbgC6WWBMBqLa92vC3FmFQti6am17KS9jHEKgirPF")
const asset = await fetchDigitalAsset(umi, mint)
console.log(asset)

console.log(asset.metadata.name)
console.log(asset.metadata.symbol)
console.log(asset.metadata.uri)