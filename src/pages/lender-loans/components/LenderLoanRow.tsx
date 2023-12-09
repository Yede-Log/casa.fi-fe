"use-client";

import { useState } from 'react';
// import { Feature } from './Feature'
import { Button } from 'react-bootstrap'
import Link from 'next/link';
// import InfoModal from './InfoModal';

export default function MyLoanRow() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <tr>
        <td>1</td>
        <td>LOANICI12345</td>
        <td>John Doe</td>
      {/* <td>
        <div className='d-flex justify-content-center'>
          <Feature text="Feature 1"></Feature>
          <Feature text="Feature 1"></Feature>
          <Feature text="Feature 1"></Feature>
        </div>
        <br />
        <div>
          <Button
            onClick={handleShow}
          >
            Show More
          </Button>
          <InfoModal 
            handleClose={handleClose} 
            showProps={show} 
          />
        </div>
        
      </td> */}
        <td>6%</td>
        <td>$50000</td>
        <td><Link href="/loans/1">View</Link></td>
    </tr>
  )
}
