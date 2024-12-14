import { useEffect } from "react";
import { useLucid } from "../../context/LucidProvider";
import NFTMarketplace from "../../services/NFT-Market";

export const NFTMarket = () => {
  const { lucid } = useLucid();
  useEffect(() => {
    async function getNftFromMarket() {
      if (!lucid) return;

      const nftMarketService = new NFTMarketplace(lucid);
      const utxos = await nftMarketService.getUTxOs();
      console.log("nft market utxos: ", utxos);
    }

    getNftFromMarket();
  }, [lucid])

  return (
    <div>NFT Market</div>
  )
}
