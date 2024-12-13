export interface NFT {
    unit: string;
    quantity: string;
    assetDetails: {
        asset: string;
        policy_id: string;
        asset_name: string;
        fingerprint: string;
        quantity: string;
        initial_mint_tx_hash: string;
        mint_or_burn_count: number;
        onchain_metadata: {
            name: string | null;
            description: string | null;
            image: string | null;
            mediaType: string | null;
        } | null;
        onchain_metadata_standard: string | null;
        onchain_metadata_extra: null | unknown;
        metadata: null | unknown;
    }
}