"use-client";

import { useState } from 'react';
// import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';
// import InfoModal from './InfoModal';
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


interface LaonFormProps {
  key:String,
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

  const handleAcceptLoan = async(id:any) => {

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <tr>
        <td>{key}</td>
        <td>{accId}</td>
        <td>{lender}</td>
        <td>8th January 2023</td>
        <td> <div className='d-flex justify-content-center'>
                <Button
                  onClick={() => handleAcceptLoan(0)}
                  className='accept-btn'
                  >
                  Accept &nbsp; <IoMdCheckmark />
                </Button>
                &emsp;
                <Button
                  // onClick={handleShow}
                  className='ml-2 reject-btn'
                  >
                  Reject &nbsp; <RxCross2 />
                </Button>
              </div></td>
    </tr>
  )
}
