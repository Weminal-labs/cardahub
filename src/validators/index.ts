import { SpendingValidator } from "lucid-cardano";
import market from "./plutus.json"

const readValidator = (): SpendingValidator => {
    const marketValidator = market.validators.find((validator) => validator.title === "market.market");
    if (!marketValidator) {
        throw new Error("Market validator not found");
    }

    return {
        type: "PlutusV2",
        script: marketValidator.compiledCode
    }
}

export default readValidator