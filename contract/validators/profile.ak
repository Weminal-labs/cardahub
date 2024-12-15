use aiken/transaction.{ScriptContext, Spend}
use marketplace/types.{VerificationKeyHash}
use marketplace/utils.{must_be_signed_by}

type UserProfile {
    owner: VerificationKeyHash,
    name: String,
    avatar: String,
    bio: String,
}

validator {
    fn user_profile(
        datum: UserProfile, 
        _redeemer: Void, 
        ctx: ScriptContext
    ) {
        let ScriptContext { transaction, purpose } = ctx
        let signed_by_owner = must_be_signed_by(transaction, datum.owner)

        when purpose is {
            Spend(_) -> {
                when signed_by_owner is {
                    True -> True
                    False -> False
                }
            }
            _ -> False
        }
    }
}