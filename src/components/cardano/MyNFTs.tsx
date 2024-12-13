import { useEffect } from "react";
import { useLucid } from "../../context/LucidProvider"

export const MyNFTs = () => {
    const { address, getUTxOs } = useLucid();

    useEffect(() => {
        async function fetchNFTs() {
            if (address) {
                const utxos = await getUTxOs(address);
                console.log("utxos: ", utxos);
            }
        }
        fetchNFTs();
    }, [address, getUTxOs])

    return (
        <div>My NFTs</div>
    )
}