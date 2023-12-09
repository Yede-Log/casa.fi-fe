import { useEthersSigner } from "@/hooks/useEthersSigner";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
// context to set context for notification

import { createContext, use, useContext, useEffect, useState } from 'react'

type Props = {
  children?: React.ReactNode
};

const ChainContext = createContext<any>({})

// provider to set context for notification
export const ChainContextProvider: React.FC<Props> = ({ children }) => {
  const [contractAddrs, setContractAddrs] = useState<any>({
    loanRegistry: null,
    renToken: null,
    renAsset: null
  })
  
  return (
    <ChainContext.Provider value={{contractAddrs, setContractAddrs }}>
      {children}
    </ChainContext.Provider>
  )
}

export const useChainContext = () => useContext(ChainContext)
