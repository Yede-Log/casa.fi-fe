'use client'
import '@/styles/main.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from 'next/app'
import { useEffect, useState } from "react";
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { celoAlfajores, lineaTestnet, mantleTestnet, polygonMumbai, scrollSepolia, zetachainAthensTestnet } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { SafeConnector } from 'wagmi/connectors/safe'
import React from 'react';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NavbarComponent } from '@/components/Navbar';
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

import { ChainContextProvider } from '@/contexts/ChainContexts';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import axios from 'axios';

//public client is ""provider""
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygonMumbai, lineaTestnet, scrollSepolia, celoAlfajores, mantleTestnet, zetachainAthensTestnet],
  [
    publicProvider(), 
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://polygon-mumbai.infura.io/v3/8eb0d43da12541ec9c7475041df80fb7`,
      }),
    }),
  ],
  )

const connector = new MetaMaskConnector({ chains })
const safeConnector = new SafeConnector({
  chains,
  options: {
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    debug: false,
  },
})

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [connector, safeConnector],
})

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setIsClient(true);
    // const yoy = async () => {
    //   const {data} = await axios.get('http://localhost:8080/api/' + 'chains')
    // console.log("chains data", data)
    // }
    // yoy()
  }, []);
  if (!isClient) return <></>;
  return (
    <WagmiConfig config={config}>
      <AnonAadhaarProvider _appId={app_id} _isWeb={false}r>
      <NotificationProvider>
        <ChainContextProvider>
          <NavbarComponent />
          <Component {...pageProps} />
        </ChainContextProvider>
      </NotificationProvider>
      </AnonAadhaarProvider>
    </WagmiConfig>
  ) 
}
