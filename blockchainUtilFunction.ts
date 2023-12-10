import { LoanRegistry } from "./contractDetails"
import { prepareWriteContract } from "@wagmi/core"

interface IcreateLoanAccount {
  _borrower: `0x${string}`,
  _asset_owner: `0x${string}`,
  _asset_contract: `0x${string}`,
  _asset_id: number,
  _token_contract: `0x${string}`
}
export const createLoanAccount = async (args: IcreateLoanAccount) => {
  await prepareWriteContract({
  address: LoanRegistry.address as `0x${string}`,
  abi: LoanRegistry.abi,
  functionName: 'create_loan_account',
  args: [args._borrower, args._asset_owner, args._asset_contract, args._asset_id, args._token_contract]
})
}