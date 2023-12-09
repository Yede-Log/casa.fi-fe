import BCTransactionModal from '@/components/BCTransactionModal'
import { useNotification } from '@/contexts/NotificationContext'
import { useLoanRegistryDisburseLoan, useRenAssetApprove, useRenTokenApprove } from '@/generated'
import useUser from '@/hooks/useUser'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { waitForTransaction } from 'wagmi/actions'
import { BreadcrumbExample } from '@/components/Breadcrumbs';
import Head from 'next/head'
// import { NotificationItem } from '@pushprotocol/restapi';

const index = () => {
  const {notifications, pushUser} = useNotification()
  const {showNotification, setShowNotification} = useUser()
  // const getNotificationsParsed = (message:any) => {
  //   try  {
  //     console.log(JSON.parse(message))
  //     return JSON.parse(message)
  //   } catch (error) {
  //     console.log({message})
  //     return message
  //   }
  // }
  return (
    <>
       <Head>
            <title>Notifications</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BreadcrumbExample 
            data={[]}
            active={"Notifications"}
        />
         <main id="main-div">
        <div className="main-box p-3">
        <div className='notification-container'>
      {/* <NotificationItem /> */}
      <div className='notification-header'>
        <h2>Notifications</h2> 
        <Form.Check // prettier-ignore
          type="switch"
          id="notifications-switch"
          label="Enable/ Disable Notifications"
          checked={showNotification}
          onChange={async () => {
            await pushUser?.notification.subscribe(
              `eip155:11155111:0x0aD0C1D4F45b91cc1F73990f708Adc8Df900F94C`,
              {
                settings: [
                  {enabled: !showNotification}
                ]
              }
            )
            setShowNotification(!showNotification)
          }}
          />
        </div>
      <br />
      {notifications?.length < 1 ? <div>No Notifications</div> : 
            notifications?.map(notification => {
              return <div key={notification.title}>
                <h6>{notification.title}</h6>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                  <div style={{color: "black"}}>{notification.message[0] === '{' ? JSON.parse(notification.message).message : notification.message}</div>
                  {notification.message[0] == '{' && <NotificationActions data={{...JSON.parse(notification.message)}} />}
                </div>
                <hr />
              </div>
            })
          }
    </div>
        </div>
    </main>
    </>
   
    
  )
}

const NotificationActions = (props) => {
  console.log({props})
  const [isLoading, setIsLoading] = React.useState(false)
  const type = props.data.type
  const {write: approveAsset} = useRenAssetApprove(
     { 
      onSettled: async (data) => {
        //@ts-ignore
        await waitForTransaction(data?.hash)
        console.log({data})
        setIsLoading(false)
      },
      onError: (error) => {
        console.log({error})
        setIsLoading(false)
      }
    }
  )
  const {write: approveToken} = useRenTokenApprove(
     { 
      onSettled: async (data) => {
        //@ts-ignore
        await waitForTransaction(data?.hash)
        console.log({data})
        setIsLoading(false)
      },
      onError: (error) => {
        console.log({error})
        setIsLoading(false)
      }
    }
  )
  const {write: disburseLoan} = useLoanRegistryDisburseLoan({
    onSettled: async (data) => {
      //@ts-ignore
      await waitForTransaction(data?.hash)
      console.log({data})
      setIsLoading(false)
    },
    onError: (error) => {
      console.log({error})
      setIsLoading(false)
    }
  })
  const handleApproveAsset = () => {

  }
  // if (props.data.type === 'erc20') {
  //   return <Button style={{minWidth: '200px'}} variant='primary'>Approve Tokens</Button>
  // }
  // if (props.data.type === 'erc721') {
  //   return <Button style={{minWidth: '200px'}} variant='primary'>Approve asset</Button>
  // }
  return <>
    <Button style={{minWidth: '200px'}}
      className='create-btn'
      onClick={() => {
        setIsLoading(true)
        if (type === 'erc20') {
          approveToken({
            args: [
              props.data.account,
              BigInt(props.data.amount * (10 ** 6) )
            ]
          })
        } else if (type === 'erc721'){
          approveAsset({
            args: [
              props.data.account,
              // BigInt(props.data.amount.hex)
              BigInt(2)
            ]
          })
        } else {
          console.log("disburse")
          disburseLoan({
            args: [
              props.data.account,
              BigInt(props.data.amount * (10 ** 6)),
              BigInt(props.data.time_period * 60),
              BigInt(60), //1 min
              props.data.interest_rate
            ]
          })
        }
      }} 
     variant='primary'>
      {type === 'erc20' && 'Approve tokens'}
      {type === 'erc721' && 'Approve asset'}
      {type === "disburse" && 'Disburse Loan'}
    </Button>
    <BCTransactionModal isLoading={isLoading} />
  </>
}

export default index