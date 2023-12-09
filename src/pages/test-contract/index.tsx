import React, { use, useEffect } from 'react'
import { useContractWrite } from 'wagmi'
import {LoanRegistry} from '../../../contractDetails'
import { createLoanAccount } from '../../../blockchainUtilFunction'
import { useLoanRegistryCreateLoanAccount } from '@/generated'
// @ts-ignore
import chains from "chains.json"

const TestContractPage = () => {
  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: LoanRegistry.address as `0x${string}`,
  //   abi: LoanRegistry.abi,
  //   functionName: 'create_loan_account',
  //   args: ['0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549', '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549', '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63540', 12, '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63548'],
  // })
  console.log({chains})
  const { data, isLoading, isSuccess, write, error } = useLoanRegistryCreateLoanAccount({
    args: ['0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549', '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549', '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63540', BigInt(12), '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63548'],
  })
  useEffect(() => {
    console.log({data, isLoading, isSuccess})
  }, [data, isLoading, isSuccess])
  const handleCreateLoanAccount = async () => {
    try {
      // await createLoanAccount({
      //   _borrower: '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549',
      //   _asset_contract: '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549',
      //   _asset_id: 5,
      //   _asset_owner: '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63540',
      //   _token_contract: '0x6BeF65D67c45505bA9BD5A747bA18Bb078E63548'
      // })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {isLoading && <div>loading</div>}
      <button onClick={() => write()}>write</button>
    </>

  )
}

export default TestContractPage