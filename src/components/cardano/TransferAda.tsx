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
        <div className="max-w-md mx-auto mt-10 p-6 
                      bg-cyber-gradient from-cyber-bg-primary/90 to-cyber-bg-secondary/90 
                      backdrop-blur-md border border-cyber-border 
                      rounded-xl shadow-2xl">
            <h1 className="text-2xl font-bold mb-6 text-center 
                         bg-gradient-to-r from-cyber-accent-cyan to-cyber-accent-indigo 
                         inline-block w-full text-transparent bg-clip-text">
                Transfer ADA
            </h1>

            <div className="space-y-4">
                <div>
                    <label htmlFor="ada" className="block text-sm font-medium text-cyber-text-secondary mb-1">
                        Amount (ADA)
                    </label>
                    <input
                        id="ada"
                        type="number"
                        value={ada}
                        onChange={(e) => setAda(Number(e.target.value))}
                        className="w-full px-4 py-2 
                                 bg-cyber-bg-secondary/50 hover:bg-cyber-bg-tertiary/50 
                                 border border-cyber-border rounded-lg 
                                 text-cyber-text-secondary placeholder-cyber-text-muted
                                 focus:outline-none focus:ring-2 focus:ring-cyber-accent-cyan/50 
                                 transition-all"
                        placeholder="Enter amount"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-cyber-text-secondary mb-1">
                        Receiver Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        className="w-full px-4 py-2 
                                 bg-cyber-bg-secondary/50 hover:bg-cyber-bg-tertiary/50 
                                 border border-cyber-border rounded-lg 
                                 text-cyber-text-secondary placeholder-cyber-text-muted
                                 focus:outline-none focus:ring-2 focus:ring-cyber-accent-cyan/50 
                                 transition-all"
                        placeholder="Enter wallet address"
                    />
                </div>

                <button
                    onClick={transferAda}
                    className="w-full py-2 px-4 
                             bg-cyber-gradient from-cyber-accent-cyan/80 to-cyber-accent-indigo/80 
                             hover:from-cyber-accent-cyan-light hover:to-cyber-accent-indigo-light
                             text-cyber-text-primary rounded-lg border border-cyber-border
                             transition-all duration-200 font-medium shadow-md"
                >
                    Transfer
                </button>

                {txHash && (
                    <div className="mt-4 p-4 
                                  bg-cyber-bg-secondary/30 
                                  border border-cyber-border rounded-lg">
                        <p className="text-sm text-cyber-text-secondary font-medium">Transaction Hash:</p>
                        <p className="text-xs text-cyber-text-muted break-all">{txHash}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransferAda
