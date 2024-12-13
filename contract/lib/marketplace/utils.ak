use aiken/transaction.{Transaction, Output}
use marketplace/types.{VerificationKeyHash}
use aiken/list
use aiken/transaction/value.{lovelace_of}
use aiken/transaction/credential.{Address}

pub fn must_be_signed_by(transaction: Transaction, vk: VerificationKeyHash) {
  list.has(transaction.extra_signatories, vk)
}

fn check_address(output: Output, address: Address) -> Bool {
  output.address.payment_credential == address.payment_credential
}

fn check_amount(output: Output, price: Int) -> Bool {
  lovelace_of(output.value) >= price
}

pub fn find_output(outputs: List<Output>, price: Int, address: Address) -> Option<Output> {
  list.find(outputs, 
    fn (output) {
      check_amount(output, price) && check_address(output, address)
    }
  )
}
