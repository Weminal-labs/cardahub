import { Data } from "lucid-cardano"

const marketDatumSchema = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    price: Data.Integer()
})

type marketDatum = Data.Static<typeof marketDatumSchema>;

export const marketDatum = marketDatumSchema as unknown as marketDatum