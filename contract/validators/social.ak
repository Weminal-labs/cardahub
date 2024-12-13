use aiken/transaction.{Transaction, ScriptContext, Spend}
use aiken/transaction/credential.{Address}
use marketplace/types.{VerificationKeyHash}
use marketplace/utils.{must_be_signed_by}

type Datum {
    owner: VerificationKeyHash,
    name: String,
    avatar: String,
    bio: String,
    birthday: String,
    jointTime: String,
    address: Address
}

type UpdateAction {
    UpdateName(String)
    UpdateAvatar(String)
    UpdateBio(String)
    UpdateAddress(Address)
}

validator {
  fn store_user(old_datum: Datum, update_action: UpdateAction, ctx: ScriptContext) {
    let ScriptContext { transaction, purpose } = ctx
    let Transaction { .. } = transaction
    let signed_by_user = must_be_signed_by(transaction, old_datum.owner)

    when purpose is {
      Spend(_) -> 
        when signed_by_user is {
          True -> 
            when update_action is {
                UpdateName(new_name) -> {
                    let new_datum = Datum {
                    ..old_datum,
                    name: new_name
                    }
                    True
                }
                UpdateAvatar(new_avatar) -> {
                    let new_datum = Datum {
                    ..old_datum,
                    avatar: new_avatar
                    }
                    True
                }
                UpdateBio(new_bio) -> {
                    let new_datum = Datum {
                    ..old_datum,
                    bio: new_bio
                    }
                    True
                }
                UpdateAddress(new_address) -> {
                    let new_datum = Datum {
                    ..old_datum,
                    address: new_address
                    }
                    True
                }
            }
          False -> False
        }
      _ -> False
    }
  }
}
