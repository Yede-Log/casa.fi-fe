"use-client";

import { useState } from 'react';
// import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';

interface InfoProps {
  data: Array<{
    maxAmount:String,
    maxTenure:String,
    interestRate: String,
    features: Array<String>
  }>
}

export const LoanOfferRow : React.FC<InfoProps> = ({data}) => {

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  const getRows = () => {
    const result: any = [];
    data.map((x,index) => {
        result.push(
          <tr>
            <td>{index+1}</td>
            <td>{x.maxAmount}</td>
            <td>{x.maxTenure}</td>
            <td>{x.interestRate}%</td>
            <td>{x.features.join(",")}</td>
            <td>-</td>
          </tr>
        )
    });

    return result;
  }

  if(data.length>0){
    return (
      <>
        {getRows()}
      </>
    )
  }
  else{
    return (
      <>
        Loading...
      </>
    )
  }
  
}
