import { Lucid } from "lucid-cardano";
import getValidator from "../validators"

class NFTMarketplace {
    private contractAddress: string;
    private lucid: Lucid;

    constructor(lucid: Lucid) {
        this.lucid = lucid;
        const validator = getValidator();
        const contractAddress = lucid?.utils.validatorToAddress(validator)

        this.contractAddress = contractAddress;
    }

    getConTractAddress() {
        return this.contractAddress;
    }

    async getUTxOs() {
        return this.lucid.utxosAt(this.contractAddress);
    }
}

export default NFTMarketplace;