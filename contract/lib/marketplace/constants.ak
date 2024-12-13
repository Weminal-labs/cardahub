use aiken/transaction/credential.{Address, Inline, VerificationKeyCredential}
use marketplace/types.{VerificationKeyHash}

pub const market_payment_vkh: VerificationKeyHash = #"366b478392b4b7e2cf15fd30db6a297b7c4847650a83d99e3c4f63f4"
pub const market_stake_vkh: VerificationKeyHash = #"a31043be9575122f8310389545f07edfcc383ed61b7f308746f233be"

pub fn market_addr() -> Address {
  Address {
    payment_credential: VerificationKeyCredential(market_payment_vkh),
    stake_credential: Some(Inline(VerificationKeyCredential(market_stake_vkh)))
  }
}

pub const market_pct: Int = 1