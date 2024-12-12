import { useState } from 'react'
import { useLucid } from '../../context/LucidProvider';

const TransferAda = () => {
    const { lucid } = useLucid()
    const [ada, setAda] = useState<number>(0);
    const [receiverAddress, setReceiverAddress] = useState<string>("");
    const [txHash, setTxHash] = useState<string>("");

    const transferAda = async () => {
        if (!lucid) {
            throw new Error("Lucid is not initialized");
        }
        const tx = await lucid.newTx()
            .payToAddress(receiverAddress, { lovelace: BigInt(ada * 1000000) })
            .complete();

        const signedTx = await tx.sign().complete()
        const txHashResult = await signedTx.submit()
        setTxHash(txHashResult)
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Transfer ADA</h1>

            <div className="space-y-4">
                <div>
                    <label htmlFor="ada" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (ADA)
                    </label>
                    <input
                        id="ada"
                        type="number"
                        value={ada}
                        onChange={(e) => setAda(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter amount"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Receiver Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter wallet address"
                    />
                </div>

                <button
                    onClick={transferAda}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Transfer
                </button>

                {txHash && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Transaction Hash:</p>
                        <p className="text-xs text-gray-500 break-all">{txHash}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransferAda
