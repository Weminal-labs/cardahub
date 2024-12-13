use aiken/transaction.{ScriptContext, Spend}
use aiken/transaction/credential.{Address}
use marketplace/types.{VerificationKeyHash}
use marketplace/utils.{must_be_signed_by}

type UserProfile {
    owner: VerificationKeyHash,
    name: String,
    avatar: String,
    bio: String,
    birthday: String,
    jointTime: String,
    address: Address
}

type Action {
    Create(UserProfile)
    Update(UserProfile)
}

validator {
    fn user_profile(
        datum: Option<UserProfile>, 
        action: Action, 
        ctx: ScriptContext
    ) {
        let ScriptContext { transaction, purpose } = ctx

        when purpose is {
            Spend(_) -> 
                when datum is {
                    None -> 
                        when action is {
                            Create(new_profile) -> 
                                must_be_signed_by(transaction, new_profile.owner)
                            _ -> False
                        }
                    Some(old_profile) -> 
                        when action is {
                            Update(new_profile) -> 
                                must_be_signed_by(transaction, new_profile.owner) && 
                                old_profile.owner == new_profile.owner
                            _ -> False
                        }
                }
            _ -> False
        }
    }
}