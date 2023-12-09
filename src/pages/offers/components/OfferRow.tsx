"use-client";

import { useState } from 'react';
import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';
import InfoModal from './InfoModal';
import { BsFillEyeFill, BsBoxArrowInUpRight } from "react-icons/bs";


import styles from "../styles/offertable.module.scss";

interface InfoProps {
  offerId: String,
  lender : String,
  institutionType : String,
  features : Array<String>,
  interestRate : Number,
  maxTenure : Number,
  maxAmount : Number,
  floating : Boolean,
  acceptance : Number,
  documentsRequired : Array<String>,
  description : String
}

export const OfferRow : React.FC<InfoProps> = ({
  offerId,
  lender,
  institutionType,
  features,
  interestRate,
  maxTenure ,
  maxAmount,
  floating ,
  acceptance ,
  documentsRequired,
  description
}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <tr>
      <td>{lender}</td>
      <td>{institutionType}</td>
      <td>
        <div className='d-flex justify-content-start'>
          {
            features.map(x=>{
              return <Feature text={x}></Feature>
            })
          }
        </div>
        <hr/>
        <div>
          <Button
            onClick={handleShow}
            className={styles.showmore}
          >
            <BsFillEyeFill style={{"scale":"1.5"}}/>
            <br />
            Show More
          </Button>
          <InfoModal 
            handleClose={handleClose} 
            showProps={show}
            offerId = {offerId}
            lender = {lender ?? ""}
            institutionType = {institutionType}
            features = {features}
            interestRate = {interestRate}
            maxTenure = {maxTenure}
            maxAmount = {maxAmount}
            floating = {floating}
            acceptance = {acceptance}
            documentsRequired = {documentsRequired}
            description = {description}
          />
        </div>
        
      </td>
      <td>{interestRate.toString()}%</td>
      <td>${maxAmount.toString()}</td>
      <td><Button className={styles.applybtn} href={"/apply-loan/"+offerId}>APPLY NOW <BsBoxArrowInUpRight /></Button></td>
    </tr>
  )
}
