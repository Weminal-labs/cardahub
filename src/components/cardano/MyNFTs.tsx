import { useEffect } from "react";
import { useLucid } from "../../context/LucidProvider"
import BlockforstService from "../../services/Blockfrost";

export const MyNFTs = () => {
    const { address } = useLucid();
    const blockfrostService = new BlockforstService();

    useEffect(() => {
        async function fetchNFTs() {
            if (address) {
                const utxos = await blockfrostService.getAddressUtxos(address);
                console.log("utxos: ", utxos);
            }
        }
        fetchNFTs();
    }, [address, blockfrostService])

    return (
        <div>My NFTs</div>
    )
}