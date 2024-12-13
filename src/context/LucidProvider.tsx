import { Address, Blockfrost, Datum, Lucid, UTxO } from "lucid-cardano";
import { createContext, useContext, useEffect, useState } from "react";

interface LucidContextType {
  lucid: Lucid | null;
  // setLucid: (lucid: Lucid | null) => void;
  address: Address | null;
  connectWallet: () => Promise<void>;
  getUTxOs: (address: string) => Promise<UTxO[]>;
  getDatum: (datumHash: string) => Promise<Datum>;
}

const LucidContext = createContext<LucidContextType | undefined>(undefined);

export const LucidProvider = ({ children }: { children: React.ReactNode }) => {
  const [lucid, setLucid] = useState<Lucid | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    const initLucid = async () => {
      try {
        const lucidInstance = await Lucid.new(
          new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodaDCuJ1u8d8yNWBBjWcc5NCGJLr9mNZeJ"),
          "Preprod",
        );
        setLucid(lucidInstance);

      } catch (error) {
        console.error("Failed to initialize Lucid:", error);
      }
    }
    initLucid();
  }, []);

  const connectWallet = async () => {
    if (!lucid) {
      throw new Error("Lucid is not initialized");
    }
    const api = await window.cardano.nami.enable()
    lucid.selectWallet(api)

    const addressResult = await lucid.wallet.address()
    setAddress(addressResult)
  }

  const getUTxOs = async (address: string) => {
    if (!lucid) {
      throw new Error("Lucid is not initialized");
    }

    // return await lucid.provider.getUtxos(address);
    return await lucid.utxosAt(address);
  }

  const getDatum = async (datumHash: string) => {
    if (!lucid) {
      throw new Error("Lucid is not initialized");
    }
    return await lucid.provider.getDatum(datumHash);
  }

  return (
    <LucidContext.Provider value={{ lucid, connectWallet, address, getUTxOs, getDatum }}>
      {children}
    </LucidContext.Provider>
  );
};

export function useLucid() {
  const context = useContext(LucidContext);
  if (context === undefined) {
    throw new Error('useLucid must be used within a LucidProvider');
  }
  return context;
}