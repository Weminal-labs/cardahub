import { SpendingValidator } from "lucid-cardano";
import market from "./plutus.json"

const readValidator = (): SpendingValidator => {
    const profileValidator = market.validators.find((validator) => validator.title === "profile.user_profile");
    if (!profileValidator) {
        throw new Error("Profile validator not found");
    }

    return {
        type: "PlutusV2",
        script: profileValidator.compiledCode
    }
}

export default readValidator