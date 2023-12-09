"use-client";

import { useState } from 'react';
// import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';
// import InfoModal from './InfoModal';


interface LaonFormProps {
  number: String,
  key:String,
  accId:String,  
  lender:String,
  interestRate:Number,
  amount:Number,
  status:String,
}

export const MyLoanRow : React.FC<LaonFormProps> = ({
  number,
  key,
  accId,  
  lender,
  interestRate,
  amount,
  status
}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <tr>
        <td>{number}</td>
        <td>{accId}</td>
        <td>{lender}</td>
        <td>{interestRate.toString()}%</td>
        <td>${amount.toString()}</td>
        <td>
          {/* {
            status == "PENDING" && (
              <>Pending</>
            ) 
          }
          {
            status == "REJECTED" && (
              <>Rejected</>
            )
          }   */}
          {/* {
            status == "ACCEPTED" && ( */}
              <Link href={"/loans/"+accId}>View</Link>
            {/* )
          } */}
        </td>
    </tr>
  )
}
