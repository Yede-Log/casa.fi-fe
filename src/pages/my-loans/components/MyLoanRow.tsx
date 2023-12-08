"use-client";

import { useState } from 'react';
// import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';
// import InfoModal from './InfoModal';


interface LaonFormProps {
  key:Number,
  accId:String,  
  lender:String,
  interestRate:Number,
  amount:Number,
  status:String,
}

export const MyLoanRow : React.FC<LaonFormProps> = ({
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
        <td>{key.toString()}</td>
        <td>{accId}</td>
        <td>{lender}</td>
        <td>{interestRate.toString()}%</td>
        <td>${amount.toString()}</td>
        <td>
          {
            status === "Pending" ? (
              <>Pending</>
            ) : (
              <Link href={"/loans/"+accId}>View</Link>
            )
          }
          
        </td>
    </tr>
  )
}
