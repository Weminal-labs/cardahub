import { Data } from "lucid-cardano"

const marketDatumSchema = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    price: Data.Integer()
})

type NFTMarketDatum = Data.Static<typeof marketDatumSchema>;

export const NFTMarketDatum = marketDatumSchema as unknown as NFTMarketDatum