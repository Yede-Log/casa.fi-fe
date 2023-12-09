
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import styles from "./styles.module.scss";
import { Dropdown } from 'react-bootstrap';
import NotificationsDropdown from '../NotificationsDropdown';
import { Form } from 'react-bootstrap';
import { BsBellFill, BsArrowBarRight } from 'react-icons/bs';
import { useNotification } from '@/contexts/NotificationContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import lenderLoanService from '@/api-helpers/lenderLoan';
import useUser from "@/hooks/useUser";
import { usePathname } from 'next/navigation'



import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";

//@ts-ignore
import BECahins from 'chains.json'
import { switchNetwork } from 'wagmi/actions';
import { useChainContext } from '@/contexts/ChainContexts';

interface NavbarProps {
  // text: String
}



export const NavbarComponent : React.FC<NavbarProps> = ({}) => {
  
  const [anonAadhaar] = useAnonAadhaar();

  const { userAddress, isVerified ,logoutUser } = useUser();

  const {isNewNotification, setIsNewNotification} = useNotification();

  const pathname = usePathname()

  console.log(pathname);


  const setApiData = async() => {

    const body = {
      userAddress: userAddress,
      isVerified: anonAadhaar.status === "logged-in" ? true : false,
    }
    
    const result = await lenderLoanService.updateKYC(body);

  }
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    if(anonAadhaar.status==="logged-in"){
      setApiData();
    }
    
  }, [anonAadhaar]);  
  const { setContractAddrs } = useChainContext()

  return (
    <Navbar expand="lg" className={styles.navbar}>
      {/* <Container> */}
        <Navbar.Brand href="/" style={{"maxHeight":"80px", "letterSpacing":"2px"}}><img style={{"height":"70px"}} src="/casalogo.png"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto ">
            {
              pathname !="/" && (
                <>
                  <Nav.Link href="/offers">Loan Offers</Nav.Link>
                  <Nav.Link href="/my-loans">My Loans</Nav.Link>
      
                <Link href="/notifications" onClick={() => setIsNewNotification(false)}>
                  <Nav.Link href='/notifications' className={`nav-notification`}>
                    <BsBellFill />{isNewNotification && <div className='new-notification'></div>}
                  </Nav.Link>
                </Link>
                </>
              )
            }
            
          </Nav>
          {
              (anonAadhaar?.status == "logged-in" || isVerified ) &&  pathname !="/" &&  (
                <>&emsp;✅ KYC Verified</>
              )
            }
            {
              anonAadhaar?.status !== "logged-in" && pathname !="/" && (
                <>&emsp;<LogInWithAnonAadhaar /></>
              )
            }
          <Form.Select aria-label="Default select example" onChange={async(e) => {
            try{
              const selectedChain = parseInt(e.target.value)
              await switchNetwork({
                chainId: selectedChain
              })
              const chainObject = BECahins.filter((chain:any) => chain.chainId === selectedChain)[0]
              console.log("chainObject", chainObject)
              // set all contracts TODO
              const loanRegistry = chainObject.contracts.find((contract:any) => contract.name === "LoanRegistry").address
              const renToken = chainObject.contracts.find((contract:any) => contract.name === "RENToken").address
              const renAsset = chainObject.contracts.find((contract:any) => contract.name === "RealEstateNft").address
            } catch(err){
              console.log("Error | swtich network", err);
            }
          }} style={{"maxWidth":"300px","marginLeft":"2%"}} defaultValue={80001}>
              <option>Open this select menu</option>
              {BECahins.map((chain:any) => <option value={chain.chainId}>{chain.name}</option>)}

            </Form.Select>
            {
              pathname !="/" && (
                <Link href="/" onClick={() => logoutUser()}>
                  <Nav.Link href='/' className={`nav-notification`}>
                      &emsp;<BsArrowBarRight  style={{"color":"black"}}/>
                  </Nav.Link>
                </Link>
            
              )
            }
            
            
            
          </Navbar.Collapse>

      {/* </Container> */}
    </Navbar>
  );

}