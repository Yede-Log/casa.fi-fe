"use-client";

import { useState,useEffect } from 'react';
// import { Feature } from './Feature'
import { Button, Table } from 'react-bootstrap'
import Link from 'next/link';
import { renAssetAddress, renTokenAddress, useLoanRegistryCreateLoanAccount } from '@/generated';
import lenderLoanService from '@/api-helpers/lenderLoan';
import axios from 'axios';
import { waitForTransaction } from 'wagmi/actions';
import BCTransactionModal from '@/components/BCTransactionModal';
import { useChainContext } from '@/contexts/ChainContexts';
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


interface ILoanApplicationResponse {
  "_id": string,
  "borrower": `0x${string}`,
  "loan_offer": string,
  "reason": string,
  "documents": string[],
  "amount": 100000,
  "tenure": 24,
  "status": string,
  "createdAt": string,
  "updatedAt": string
  "assetId": number
}

export default function LoanRequestsRow() {
  const [apiData, setApiData] = useState<ILoanApplicationResponse[]>([] as ILoanApplicationResponse[]);  
  const [loading, setLoading] = useState(false);
  const { contractAddrs } = useChainContext()
  const router  = useRouter();
  const { write, error } = useLoanRegistryCreateLoanAccount(
    { 
      onSettled: async (data) => {
        //@ts-ignore
        await waitForTransaction(data?.hash)
        console.log({data})
        setLoading(false)
      },
      onError: (error) => {
        console.log({error})
        setLoading(false)
      }
    }
  )

  const getApiData = async() => {
        const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + "loan-application")
        const temp_array:any = [];

        result.data.map((x:any)=>{
          if(x.status === "PENDING"){
            temp_array.push(x);
          }
        })
        console.log(result);
        setApiData(temp_array);
      
    }

  useEffect(()=>{
    try {
      getApiData()
    } catch (error) {
      console.log(error)
    }
  },[])

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleAcceptLoan = (index: number,evt:any) => {
    //lender creates loan on chain
    setLoading(true);
    evt.preventDefault();
    write({
      args: [
        `${apiData[index].borrower}`,
        `${apiData[index].borrower}`,
        renAssetAddress,
        BigInt(apiData[index].assetId),
        // BigInt(1),
        renTokenAddress
        ]
      })  
  }

  const handleRejectLoan = async(id:String,evt:any) => {
    // setLoading(true);
    evt.preventDefault();
    const result = await lenderLoanService.updateLoanApplication(id);

    if(result){
      Swal.fire({
          title: "Success!",
          text: "The loan application is rejected.",
          icon: "success"
      }).then(()=>{
          // router.push('/my-loans');
          // setLoading(false);
          getApiData();
      });

  }
  else{
      Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Error in rejecting the application",
      });
      
  }
  }
  
  return (
    <Table striped bordered hover>
      {loading && <div>loading</div>}
      <thead>
          <tr>
              <th>S No.</th>
              <th>Loan Application ID</th>
              {/* <th>Lendee Name</th> */}
              <th>Loan Amount</th>
              {/* <th>EMI Amount</th> */}
              <th>Loan Term</th>
              <th>Asset id</th>
              {/* <th>Interest Rate</th> extrs hai*/} 
              {/* <th>Registration Date</th> */}
              <th>Document</th>
              <th>Action</th>
          </tr>
      </thead>
      {/* mapping  */}
      <tbody>
            {apiData.map((item,index) => (

          <tr>
            <td>{index+1}</td>
            <td>{item._id}</td>
            {/* <td>John Doe</td> */}
            <td>$ {item.amount}</td>
            {/* <td>USD 450</td> */}
            <td>{item.tenure}</td>
            <td>{item.assetId ?? "ll"}</td>
            {/* <td>1</td> */}
            <td>
              <Link target="_blank" href={item?.documents[0] ?? ""}>See Documents</Link>
            </td>
            <td>
              <div className='d-flex justify-content-center'>
                <Button
                  onClick={(evt) => handleAcceptLoan(index,evt)}
                  className='accept-btn'
                >
                  Accept &nbsp; <IoMdCheckmark />
                </Button>
                &emsp;
                <Button
                  // onClick={handleShow}
                  className='ml-5 reject-btn'
                  onClick={(evt) => handleRejectLoan(item._id,evt)}
                  >
                  Reject &nbsp; <RxCross2 />
                </Button>
              </div>
              
              
            </td>
        </tr>
        ))}
      </tbody>
      <BCTransactionModal isLoading={loading} />
      </Table>

  )
}
