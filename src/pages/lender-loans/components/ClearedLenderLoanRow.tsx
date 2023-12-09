"use-client";

import { useState } from 'react';
// import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';
import InfoModal from './InfoModal';
import moment from "moment";

interface InfoProps {
  data: Array<{
    _id: String,
		loanAccount: String,
		lender: String,
		borrower: String,
		loanOffer: String,
		loanApplication: String,
		status: String,
		assetId: Number,
		chainId: Number,
		createdAt: String,
		updatedAt: String
  }>
}

export const ClearedLoanRow : React.FC<InfoProps> = ({data}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getRows = () => {
    const result = [];
    data.map((x:any,index)=>{
      result.push(
        <tr>
          <td>{index+1}</td>
          <td>{x.loanApplication}</td>
          <td>USD {x.amount?.toString() ?? ""}</td>
          <td>USD {x.emi?.toString() ?? ""}</td>
          <td>{x.acceptance?.toString() ?? ""}</td>
          <td>1</td>
          <td>{x.interestRate?.toString() ?? ""}%</td>
          <td> 
            {moment(x.createdAt).format('llll')}
          </td>
          <td> 
            {moment(x.updatedAt).format('llll')}
          </td>
        </tr>
      )
    })
  }

  return (
    <>
    {getRows()}
    </>
  )
}
