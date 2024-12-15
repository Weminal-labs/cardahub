use aiken/transaction/value.{AssetName, PolicyId}
use marketplace/types.{VerificationKeyHash}
use aiken/transaction.{ScriptContext, Transaction, Spend}
use marketplace/constants.{market_pct, market_addr}
use marketplace/utils.{find_output, must_be_signed_by}
use aiken/transaction/credential.{from_verification_key}

type Datum{
  policyId: PolicyId,
  assetName: AssetName, 
  seller: VerificationKeyHash,
  price: Int
}

validator {
  fn market(datum: Datum, _redeemer: Void, ctx: ScriptContext){
    let ScriptContext {transaction, purpose} = ctx
    let Transaction {outputs, ..} = transaction
    let signed_by_seller = must_be_signed_by(transaction, datum.seller)

    when purpose is {
      Spend(_) -> 
        when signed_by_seller is {
          True -> True
          False -> {
            let market_fee: Int = market_pct * datum.price / 100
            let output_seller = find_output(outputs, datum.price, from_verification_key(datum.seller))
            let output_market = find_output(outputs, market_fee, market_addr())
            
            if output_seller == None || output_market == None {
              False
            } else {
              True
            }
          }
        }

      _ -> False
        
    }
  }
}
