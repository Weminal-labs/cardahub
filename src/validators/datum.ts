import { Data } from "lucid-cardano"

const marketDatumSchema = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    price: Data.Integer()
})

const profileDatumSchema = Data.Object({
    owner: Data.Bytes(),
    name: Data.Bytes(),
    avatar: Data.Bytes(),
    bio: Data.Bytes(),
})

type profileDatum = Data.Static<typeof profileDatumSchema>;
type NFTMarketDatum = Data.Static<typeof marketDatumSchema>;

export const NFTMarketDatum = marketDatumSchema as unknown as NFTMarketDatum
export const profileDatum = profileDatumSchema as unknown as profileDatum