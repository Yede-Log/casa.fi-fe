import { useState, useEffect } from 'react'
import { useDisconnect } from 'wagmi'
const useUser = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isVerified, setIsVerified] = useState<Boolean | null>(null)
  const [isLender, setIsLender] = useState<Boolean | null>(null)
  const [userToken, setUserToken] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(true);

  const { disconnect } = useDisconnect()

  const logoutUser = () => {
    localStorage.removeItem('userAddress')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('isLender')
    localStorage.removeItem('userToken')
    localStorage.removeItem('isVerified')
    localStorage.removeItem('showNotification')
    localStorage.removeItem('showNotification')
    setIsAuthenticated(false)
    setUserAddress("")
    setUserEmail("")
    setIsLender(null)
    setUserToken(null)
    disconnect()
    console.log("user logged out")
  }

  useEffect(() => {
    const userAddress = localStorage.getItem('userAddress')
    const userEmail = localStorage.getItem('userEmail')
    const isLender = localStorage.getItem('isLender')
    const isVerified = localStorage.getItem('isVerified')
    const userToken = localStorage.getItem('userToken')
    if(userToken && userAddress && userEmail && isLender){
      setIsAuthenticated(true)
      setUserAddress(userAddress)
      setUserEmail(userEmail)
      setIsVerified(isVerified === "true");
      setIsLender(isLender === "true" ? true : false)
      setUserToken(userToken)
      setShowNotification(true)
    } else {
      logoutUser()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('showNotification', showNotification.toString())
  }, [showNotification])
  
  return {
    isAuthenticated,
    userAddress,
    userEmail,
    isLender,
    isVerified,
    userToken,
    logoutUser,
    showNotification,
    setShowNotification
  }
}

export default useUser