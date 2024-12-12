import { useState } from 'react';
import { useLucid } from '../../context/LucidProvider';
import { fromText } from 'lucid-cardano';

export const Mint = () => {
    const { lucid } = useLucid()

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [txHash, setTxHash] = useState<string>("")

    const getMintingPolicy = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const { paymentCredential } = lucid.utils.getAddressDetails(
            await lucid.wallet.address(),
        );

        if (!paymentCredential) {
            throw new Error("Payment credential is not initialized");
        }

        const mintingPolicy = lucid.utils.nativeScriptFromJson(
            {
                type: "all",
                scripts: [
                    { type: "sig", keyHash: paymentCredential.hash },
                    {
                        type: "before",
                        slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
                    },
                ],
            },
        );

        const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

        return {
            policyId,
            mintingPolicy,
        }
    }

    const mint = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }

        const { policyId, mintingPolicy } = await getMintingPolicy();

        // Truncate strings to ensure they don't exceed 64 characters
        const truncatedName = name.slice(0, 64);
        const truncatedDescription = description.slice(0, 64);
        const truncatedImage = image.slice(0, 64);
        const assetName = fromText(truncatedName);

        //20 - FT
        //721 - NFT
        const tx = await lucid.newTx()
            .mintAssets({ [policyId + assetName]: 1n })
            .attachMetadata(721, {
                [policyId]: {
                    [truncatedName]: {
                        name: truncatedName,
                        description: truncatedDescription,
                        image: truncatedImage,
                    }
                }
            })
            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy)
            .complete();

        const signedTx = await tx.sign().complete();
        const txHashResult = await signedTx.submit();

        setTxHash(txHashResult);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-bold text-gray-800">Mint NFT</h1>

                <div className="w-full space-y-6">
                    <div className="w-full">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
                            NFT Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter NFT name"
                        />
                        {name.length > 64 && (
                            <p className="text-xs text-red-500 mt-1">
                                Name will be truncated to 64 characters
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 block">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-24 resize-none"
                            placeholder="Enter NFT description"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1 block">
                            Image URL
                        </label>
                        <input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter image URL"
                        />
                    </div>

                    <button
                        onClick={mint}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed mt-3"
                        disabled={!name || !description || !image}
                    >
                        Mint NFT
                    </button>

                    {txHash && (
                        <div className="w-full p-4 bg-green-50 rounded-lg mt-5">
                            <p className="text-sm text-green-800 font-medium">Transaction Hash:</p>
                            <p className="text-xs text-green-600 break-all">{txHash}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}