import Head from 'next/head'
import GetStarted from '../components/GetStarted'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { Suspense, lazy, useState } from 'react'
import GetStartedAsDao from '@/components/GetStartedAsDao'
import axios from 'axios'
import { switchNetwork } from 'wagmi/actions'
// import Spline from '@splinetool/react-spline'
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function Home() {
  const { isAuthenticated, isLender } = useUser()
  const router = useRouter()

  if (isAuthenticated) {
    // router.push(Boolean(isLender) ? '/offers' : '/my-loans') //RECHECK this
  }
  return (
    <>
      <Head>
        <title>Casa Fi | Unlock Future with Real Estate NFT-Based Crypto Loans</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/casalogoicon.png" />
      </Head>
      
      <div className='hero-section'>
        <div className='hero-text'>
          <h1>Revolutionize Finance with Real Estate NFT-Backed Crypto Loans</h1>
          <h4 className='hero-subtitle-text'>Empowering Your Real Estate NFT Assets to Fuel Your Future</h4>
          <GetStarted />
          <GetStartedAsDao />
        </div>
        <Suspense fallback={<img src="/heroImage.png" />}>
          <Spline style={{height: "55vh"}} scene="https://prod.spline.design/MVmp28EpN8o3YxIk/scene.splinecode" className='hero-image' />
        </Suspense>
      </div>
    </>
  )
}
