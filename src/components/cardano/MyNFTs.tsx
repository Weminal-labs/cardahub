import { useEffect, useState } from "react";
import { useLucid } from "../../context/LucidProvider"
import BlockforstService from "../../services/Blockfrost";
import { NFT } from "../../types/NFT"
import NFTCard from "./NFTCard"

export const MyNFTs = () => {
    const { address } = useLucid();
    const [nfts, setNfts] = useState<NFT[]>([]);
    const lucid = useLucid();

    useEffect(() => {
        const blockfrost = new BlockforstService();
        async function fetchNFTs() {
            if (!address || !lucid) return;
            const result = await blockfrost.getNFTs(address);
            setNfts(result);
            console.log(nfts);
        }
        fetchNFTs();
    }, [address, nfts, lucid])

    return (
        <div className="mt-8 p-6">
            <h2 className="text-3xl font-bold mb-6 text-center 
                         bg-gradient-to-r from-cyber-accent-cyan to-cyber-accent-indigo 
                         inline-block text-transparent bg-clip-text">
                My NFTs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nfts.map((nft, index) => (
                    <NFTCard key={index} nft={nft} />
                ))}
            </div>

            {nfts.length === 0 && (
                <div className="text-center py-12 text-cyber-text-muted">
                    No NFTs found in your wallet
                </div>
            )}
        </div>
    )
}