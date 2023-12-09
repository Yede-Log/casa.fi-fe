"use-client";

import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LoanOfferRow } from './LoanOfferRow';
import CreateLoanModal from './createLoanOffer';
import lenderLoanService from '@/api-helpers/lenderLoan';
import axios from 'axios';

export default function LenderOfferMain() {
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const getApiData = async() => {
        // const result:any = await lenderLoanService.getAllLoanOffers();

        // console.log(result);
        // if(result){
        //     setData(result);
        // }
        const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + "loan-offers")
        console.log(result);
        setData(result.data);
        setLoading(false)
        
    }
    useEffect(()=>{
        try{
            getApiData()
        } catch (error) {
            console.log(error)
        }
    },[])

    return (
        <>
        <Button onClick={handleShow} className="create-btn" style={{"float":"right"}}>Create an Offer</Button>
        <br /><br />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Max Loan Amount</th>
                    <th>Max Tenure</th>
                    <th>Interest Rate</th>
                    <th>Features</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? (
                        <>Loading..</>
                    ) : (
                        <LoanOfferRow 
                            data = {data}
                        />
                    )
                }
                
            </tbody>
            </Table>
            <CreateLoanModal 
                handleClose={handleClose} 
                showProps={show} 
            />
        </>
    )
}
