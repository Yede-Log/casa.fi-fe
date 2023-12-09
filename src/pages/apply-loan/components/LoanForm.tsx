"use-client";

import { Row, Col,Form, Button } from "react-bootstrap";
import styles from "../styles/loanform.module.scss";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { ethers } from "ethers";
import lenderLoanService from "@/api-helpers/lenderLoan";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import lighthouse, { upload } from "@lighthouse-web3/sdk"

interface LaonFormProps {
    offer_id: String
}

// Define your API Key (should be replaced with secure environment variables in production)
const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY ?? ""

export const LoanForm : React.FC<LaonFormProps> = ({offer_id}) => {
  
    const router = useRouter();
    const { userAddress } = useUser();
    const [amount,setAmount] = useState(0);
    const [tenure,setTenure] = useState(0);
    const [date,setDate] = useState(1);
    const [interest,setInterest] = useState(0);
    const [asset,setAssetId] = useState(0);
    const [file, setFile] = useState(null)

    const [data,setData] = useState({
        _id: String,
        lender : String,
        institutionType : String,
        features : Array<String>,
        interestRate : Number,
        maxTenure : Number,
        maxAmount : Number,
        floating : Boolean,
        acceptance : Number,
        documentsRequired : Array<String>,
        description : String,
        createdAt:String,
	    updatedAt:String
    });
    const [loading,setLoading] = useState(true);

    

  // Function to sign the authentication message using Wallet
  const signAuthMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.")
        }
        const signerAddress = accounts[0]
        const { message } = (await lighthouse.getAuthMessage(signerAddress)).data
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        })
        return { signature, signerAddress, message }
      } catch (error) {
        console.error("Error signing message with Wallet", error)
        return null
      }
    } else {
      console.log("Please install Wallet!")
      return null
    }
  }


  const handleShare = async(cid:string) => {

    const encryptionAuth = await signAuthMessage()
      if (!encryptionAuth) {
        console.error("Failed to sign the message.")
        return
      }

      const { signature, signerAddress, message } = encryptionAuth

    const publicKey = "0xAb294aF62CECe3F16101673abC9A30E8bca511ca"
      const receiverPublicKey = [];

      receiverPublicKey.push(data.lender.toString())

      const shareResponse = await lighthouse.shareFile(
        publicKey,
        receiverPublicKey,
        cid,
        signature
      );
  }
    // Function to upload the encrypted file
  const uploadEncryptedFile = async () => {
    if (!file) {
      console.error("No file selected.")
      return
    }

    try {
      // This signature is used for authentication with encryption nodes
      // If you want to avoid signatures on every upload refer to JWT part of encryption authentication section
      const encryptionAuth = await signAuthMessage()
      if (!encryptionAuth) {
        console.error("Failed to sign the message.")
        return
      }

      const { signature, signerAddress, message } = encryptionAuth

      // Upload file with encryption
      const output = await lighthouse.uploadEncrypted(
        file,
        apiKey,
        signerAddress,
        signature,
        // progressCallback
      )
      console.log("Encrypted File Status:", output)
      /* Sample Response
        {
          data: [
            Hash: "QmbMkjvpG4LjE5obPCcE6p79tqnfy6bzgYLBoeWx5PAcso",
            Name: "izanami.jpeg",
            Size: "174111"
          ]
        }
      */
      // If successful, log the URL for accessing the file
      console.log(
        `Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`
      )

      await handleShare(output.data[0].Hash);
      

      return `https://decrypt.mesh3.network/evm/${output.data[0].Hash}`;
    } catch (error) {
      console.error("Error uploading encrypted file:", error)
    }
  }

  // Function to handle file selection
  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

    const getApiData = async() => {
        const result:any = await lenderLoanService.getLoanOfferById(offer_id);
        console.log(result);
        if(result){
            setData(result);
            setInterest(result.interestRate);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getApiData();
    },[])

    const handleClick = async(evt:any) => {

        evt.preventDefault();

        if(amount===0 || tenure === 0 || asset === 0){
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Please fill all the details",
            });
            return;
        }
        
        

        const temp_intr : any = interest / 12;
        const overall_interest : any = (amount * temp_intr * ( Math.pow(1+temp_intr,tenure) / (Math.pow(1+temp_intr,tenure) - 1))).toFixed(2);
        const emi = (( overall_interest + amount ) / tenure).toFixed(2);

        

        Swal.fire({
            title: "Please Confirm!",
            html: `Your monthly EMI will be <b>USD ${emi} </b> and will be deducted <b>${date}</b> of every month for a tenure of <b>${tenure} months</b>.`,              
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed"
          }).then(async(result:any) => {

            const link = await uploadEncryptedFile();
            console.log(link);

            const body = {
                "borrower": userAddress,
                "loan_offer":offer_id,
                "reason": "Home Purchase",
                "documents": [link],
                "amount": amount,
                "tenure": tenure,
                "assetId": asset,
                "chainId": "80001", // Recheck this
                "status": "PENDING",
                // "link": link
            }
            if (result.isConfirmed) {
                const result = await lenderLoanService.createLoanApplication(body);

                if(result){
                    Swal.fire({
                        title: "Success!",
                        text: "Your Loan Application has been submitted for the review.",
                        icon: "success"
                    }).then(()=>{
                        router.push('/my-loans');
                    });
                }
                else{
                    Swal.fire({
                        title: "Error!",
                        icon: "error",
                        text: "Error in creating loan application",
                    });
                    
                }
                
            }
          });
    }
    
  return (
        <>
        { loading && 
            (
                <>Loading...</>
            )
        }
        { !loading && (
        <>
        <Form>
        <Row>
            <div className={styles.featurelist}>
                <div className={styles.featurelistdiv}>
                    <h4>Interest Rate</h4>
                    <h5>{data.interestRate?.toString()}%</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Max Tenure</h4>
                    <h5>{data.maxTenure?.toString()} months</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Max Amount</h4>
                    <h5>${data.maxAmount?.toString()}</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Floating Interest</h4>
                    <h5>{data.floating?.toString() === "true" ? "Yes":"No"}</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Acceptance </h4>
                    <h5>{data.acceptance?.toString()} Days</h5>
                </div>
            </div>

            <h5>Enter Details</h5>
            
            <Col md={3} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total Amount *</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter amount"
                        value={amount} 
                        onChange={(e)=>{
                            setAmount(parseInt(e.target.value))
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                    Enter the amount in USD
                    </Form.Text>
                </Form.Group>
            </Col>
            <Col md={3} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tenure *</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter months" 
                        max={240} 
                        value={tenure} 
                        onChange={(e)=>{
                            setTenure(parseInt(e.target.value))
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                    Enter the tenure of loan in months
                    </Form.Text>
                </Form.Group>
            </Col>
            <Col md={3} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Asset ID *</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter months"  
                        value={asset} 
                        onChange={(e)=>{
                            setAssetId(parseInt(e.target.value))
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                    Enter the Asset ID
                    </Form.Text>
                </Form.Group>
            </Col>
            {/* {
                date > 0 && (
                    <>
                        <h6>Principal Amount : USD 20,000</h6>
                        <h6>Interest to be Paid : USD 12,000</h6>
                        <h6>EMI : USD 450</h6>
                        <br />
                    </>
                )
            } */}

            {/* <h5>Upload Documents</h5> */}
            
            <Col md={6} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=> handleFileChange(e)}>
                    <Form.Label>Upload Documents</Form.Label>
                    <Form.Control type="file" placeholder="Enter months" required/>
                    <Form.Text className="text-muted">
                    Following documents are needed:
                    <ol>
                        <li>Aadhar Card</li>
                        <li>PAN Card</li>
                    </ol>
                    </Form.Text>
                </Form.Group>
            </Col>
            <Col md={12} className="mt-3">
                <Button type="submit" className={styles.applybtn} onClick={(evt)=>handleClick(evt)}>Apply</Button>
            </Col>
            
        </Row>
        <br /><br />
        <h5>About {data?.lender?.toString() ?? ""}</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            
        
        <h5>Terms and Conditions</h5>
            <ol className={styles.terms}>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
            </ol>
    </Form>
    </>
        )}
    </>
  );

}
