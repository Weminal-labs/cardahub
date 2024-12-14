import { useEffect, useState } from "react";
import { useLucid } from "../../context/LucidProvider";
import NFTMarketplace from "../../services/NFT-Market";
import { Data, UTxO } from "lucid-cardano";
import { NFTMarketDatum } from "../../validators/datum";
import { NFTListing } from "../../types/NFT";
import getValidator from "../../validators";

export const NFTMarket = () => {
  const { lucid } = useLucid();
  const [nfts, setNfts] = useState<NFTListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [txHash, setTxHash] = useState<string>("");

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!lucid) return;
      const nftMarketService = new NFTMarketplace(lucid);
      const scriptUTxOs = await nftMarketService.getUTxOs();

      const utxos = scriptUTxOs?.map((utxo) => {
        try {
          const temp = Data.from<NFTMarketDatum>(utxo.datum ?? '', NFTMarketDatum);
          return {
            ...utxo,
            ...temp
          }
        } catch (error) {
          return error;
        }
      }).filter(Boolean) as NFTListing[];

      setNfts(utxos || []);
      setLoading(false);
    };

    fetchNFTs();
  }, [lucid]);

  const buyNFT = async (nft: NFTListing) => {
    try {
      const validator = getValidator();

      const contractAddress = lucid?.utils.validatorToAddress(validator)

      if (!contractAddress) {
        throw new Error("Contract address not found");
      }

      // const feeMarket 
      const policyId = nft.policyId;
      const assetName = nft.assetName;

      const marketAddress = "addr_test1qqmxk3urj26t0ck0zh7npkm299ahcjz8v59g8kv7838k8a9rzppma9t4zghcxypcj4zlqlklesura4sm0ucgw3hjxwlqs5jf3h";

      const feeMarket = (BigInt(nft.price) * 1n * 10n ** 6n) / 100n; // 1% fee of the price

      const sellerAddressCredential = lucid?.utils.keyHashToCredential(nft?.seller);
      if (!sellerAddressCredential) {
        throw new Error("Seller address credential not found");
      }
      console.log("sellerAddressCredential", sellerAddressCredential);

      const sellerAddress = lucid?.utils.credentialToAddress(sellerAddressCredential);
      if (!sellerAddress) {
        throw new Error("Seller address not found");
      }
      console.log("sellerAddress", sellerAddress);

      const tx = await lucid?.newTx()
        .payToAddress(sellerAddress, { lovelace: BigInt(nft?.price) * 10n ** 6n })
        .payToAddress(marketAddress, { lovelace: feeMarket })
        .collectFrom([nft], Data.void())
        .attachSpendingValidator(validator).complete();

      if (!tx) {
        throw new Error("Transaction not found");
      }

      const signedTx = await tx.sign().complete();

      const txHash = await signedTx.submit();

      setTxHash(txHash);
    } catch (error) {
      console.error("Error unlocking ADA:", error);
    }
  }

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Show Transaction Hash if exists */}
      {txHash && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-800 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-400 font-medium mb-1">
                Transaction Successful!
              </h3>
              <p className="text-sm text-gray-400">
                Transaction Hash:
              </p>
              <p className="text-sm text-gray-300 font-mono break-all">
                {txHash}
              </p>
            </div>
            <a
              href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-green-400 hover:text-green-300 
                       border border-green-800 rounded-lg transition-colors"
            >
              View on Explorer
            </a>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">NFT Marketplace</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((listing) => (
          <div
            key={listing.txHash}
            className="bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-all border border-gray-700"
          >
            {/* NFT Basic Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 truncate">
                {listing.assetName}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Price:</span>
                <span className="text-xl font-bold text-green-500">
                  {Number(listing.price) / 1_000_000} ₳
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Seller:</span>
                <span className="text-gray-300 truncate max-w-[180px]" title={listing.seller}>
                  {listing.seller.slice(0, 8)}...{listing.seller.slice(-8)}
                </span>
              </div>
            </div>

            {/* Technical Details (Collapsible) */}
            <details className="mb-4">
              <summary className="cursor-pointer text-sm text-gray-400 mb-2">
                Technical Details
              </summary>
              <div className="space-y-1 text-xs text-gray-500">
                <div className="truncate" title={listing.policyId}>
                  <span className="text-gray-400">Policy ID:</span> {listing.policyId.slice(0, 15)}...
                </div>
                <div className="truncate" title={listing.address}>
                  <span className="text-gray-400">Address:</span> {listing.address.slice(0, 15)}...
                </div>
                <div className="truncate" title={listing.txHash}>
                  <span className="text-gray-400">Tx Hash:</span> {listing.txHash.slice(0, 15)}...
                </div>
                <div>
                  <span className="text-gray-400">Output Index:</span> {listing.outputIndex}
                </div>
              </div>
            </details>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 
                           hover:from-blue-700 hover:to-blue-800 rounded-lg font-medium 
                           transition-all duration-200"
                onClick={() => { buyNFT(listing) }}
              >
                Buy Now
              </button>

              <a
                href={`https://preprod.cardanoscan.io/transaction/${listing.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 text-center text-sm text-gray-400 
                         hover:text-gray-300 border border-gray-700 rounded-lg 
                         transition-colors duration-200"
              >
                View on Explorer
              </a>
            </div>
          </div>
        ))}
      </div>
      {
        nfts.length === 0 && (
          <div className="text-center text-gray-400 mt-8 p-8 border border-gray-800 rounded-xl">
            <p className="text-lg">No NFTs currently listed in the marketplace</p>
            <p className="text-sm mt-2">Check back later for new listings</p>
          </div>
        )
      }
    </div >
  );
}
