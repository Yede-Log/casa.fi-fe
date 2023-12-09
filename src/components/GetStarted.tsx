import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useAccount, useConnect } from 'wagmi'
import { connect, signMessage } from '@wagmi/core'
import { Modal } from 'react-bootstrap'
import CrazyLoader from './CrazyLoader'
import axios from 'axios'
import { useRouter } from 'next/router'

const GetStarted = () => {
  const { connectors } = useConnect()
  const { address } = useAccount()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [modalMessage, setModalMessage] = useState("Hello modal")
  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])
  // console.log(await connectors[0].getChainId())

  const handleClick = async() => {
    try {
      setIsLoading(true)
      setModalMessage("connecting to wallet")
      // first connect to wallet
      let connectionResult = null
      if(!address){
        connectionResult = await connect({connector: connectors[0]})
      }
      console.log("wallet connected")
      setModalMessage("wallet connected")

      // then call endpoint requesting message to sign
      const messageResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'auth/request-message', {address: address ?? connectionResult?.account, chain: await connectors[0].getChainId(), network: "gg"})
      const message = messageResponse.data.message
      setModalMessage("Please sign message to continue")

      // then sign message
      const signature = await signMessage({
        message
      })
      setModalMessage("We are verifiying your signature, please wait")
      const signatureResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'auth/verify', {signature: signature, message: message, email: email})
      console.log("signatureResponse", signatureResponse)

      const {token, userExist: {email:userEmail, address: userAddress, isLender}} = signatureResponse.data
      localStorage.setItem('userEmail', userEmail)
      localStorage.setItem('userAddress', userAddress)
      localStorage.setItem('isLender', isLender)
      localStorage.setItem('userToken', token)

      // now authenticate user
      const authResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'auth/authenticate', {token: token})
      console.log("authResponse", authResponse)
      router.push(isLender ? '/offers' : '/my-loans') //RECHECK this
      

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log("GetStarted | error ", error)
    }
  }

  if(!isClient) return <div></div>
  return (<>
     <Form>
      <Form.Group className="mb-3 email-input-form" controlId="formBasicEmail" >
        <Form.Control type="email" placeholder="Enter your email" className='email-input' onChange={e => setEmail(e.target.value)} value={email}/>

        <Button variant="dark" className='get-started-button' type='submit' disabled={isLoading} onClick={handleClick}>{isLoading ? "Loading" : "Get Started"}</Button> 
      </Form.Group>
    </Form>
     {/* {error && <div>{error.message}</div>} */}
     <Modal show={isLoading} backdrop={"static"} className='modal-get-started'>
        <Modal.Body> <CrazyLoader scale='0.6' /><br />{modalMessage}</Modal.Body>
      </Modal>
  </>
  )
}

export default GetStarted