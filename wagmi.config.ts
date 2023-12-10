import { defineConfig } from '@wagmi/cli'
import { erc20ABI, erc721ABI } from 'wagmi'
import { LoanRegistry } from './contractDetails'
import { react, actions } from '@wagmi/cli/plugins'
import renAssetMetadata from './artifacts/RenAsset_metadata.json'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'RENToken',
      address: '0x44C551c7F86BB72ef88c076e75b1C4F8A494F220',
      abi: erc20ABI,
    },
    {
      name: 'RENAsset',
      address: '0xD1a8622AB2d15F3bf603Ec33ba9cC93E06B60f68',
      abi: renAssetMetadata.output.abi as any,
    },
    {
      name: 'LoanRegistry',
      address: '0x82A947c0432dD0BA11e4ae0a8DB2df0cA8a096DD',
      abi: LoanRegistry.abi as any,
    }
  ],
  plugins: [react({
    useContractRead: true,
    useContractFunctionRead: true,
    usePrepareContractWrite: true,
    usePrepareContractFunctionWrite: true,
  }), 
  actions({
    getContract: true,
    prepareWriteContract: true,
    readContract: true,
  })
],
})
// "https://8361-2401-4900-4e5e-72f0-cdc4-74fb-c401-a116.ngrok.io/api/"

