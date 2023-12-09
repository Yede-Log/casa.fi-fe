import { useEthersSigner } from "@/hooks/useEthersSigner";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
// context to set context for notification

import { createContext, use, useContext, useEffect, useState } from 'react'
import { useWalletClient } from "wagmi";
import { toast } from "../../utils";
interface NotificationContextType {
  title: string,
  body: string
}
interface NotificationContextProviderType {
  notifications: NotificationContextType[],
  isNewNotification: boolean,
  setIsNewNotification: React.Dispatch<React.SetStateAction<boolean>>
}
type Props = {
  children?: React.ReactNode
};
const NotificationContext = createContext<NotificationContextProviderType>({} as NotificationContextProviderType)

// provider to set context for notification
export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [isNewNotification, setIsNewNotification] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [pushUser, setPushUser] = useState<PushAPI | null>(null)
  const signer = useEthersSigner({ chainId: 13001})
  // debugger 
  // pushUser?.stream
  useEffect(() => {
    const initPush = async () => {
      try {
        const userPush = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
        setPushUser(userPush)
        const inboxNotifications = await userPush.notification.list("INBOX");
        console.log({inboxNotifications})
        setNotifications(inboxNotifications)
        const response = await userPush.notification.subscribe(
          `eip155:11155111:0x0aD0C1D4F45b91cc1F73990f708Adc8Df900F94C`, //push channel
        );
        // debugger
        const stream = await userPush.initStream([CONSTANTS.STREAM.NOTIF], {
          // filter: {
          //   channels: ["0x0aD0C1D4F45b91cc1F73990f708Adc8Df900F94C"],
          // }
        });
        // Set stream event handling
        stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
          toast(data.message.title)// + "\n" + data.message.notification.body)
          const {message} = data
          const messageData = {
            title: message.payload.title,
            message: message.payload.body
          }
          setNotifications(prev => [messageData, ...prev])
          console.log(data);
          setIsNewNotification(true)
        });
        
        // Connect to stream
        stream.connect();
      } catch (error) {
        console.log(error)
      }

      return () => {
        if(pushUser) pushUser.stream.removeAllListeners();
      }
    }
    if(signer && !isInitialized){
      initPush()
      setIsInitialized(true)
    } 
  }, [signer])

  return (
    <NotificationContext.Provider value={{notifications, isNewNotification, setIsNewNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
