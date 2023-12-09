"use-client";

import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LoanOfferRow } from './LoanOfferRow';
import CreateLoanModal from './createLoanOffer';
import lenderLoanService from '@/api-helpers/lenderLoan';
import axios from 'axios';
import { OutstandingLenderLoanRow } from './OutstandingLenderLoanRow';

export default function OutstandingLenderLoanMain() {
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const getApiData = async() => {
        const result:any = await axios.get(process.env.NEXT_PUBLIC_API_URL + "loan")
        console.log(result);
        const temp_array:any = [];
        result.data.map((x:any)=> {
            if(x.status == "IN_PROGRESS"){
                temp_array.push(x);
            }
        })
        console.log(temp_array)
        setData(temp_array);
        setLoading(false);
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
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Loan Application ID</th>
                    <th>Amount</th>
                    <th>EMI Amount</th>
                    <th>Acceptance Days</th>
                    <th>EMI Date</th>
                    <th>Interest Rate</th>
                    <th>Created Date</th>
                    <th>Disbursed Date</th>
                </tr>
            </thead>
            {
                !loading && (
                    <tbody>
                        <OutstandingLenderLoanRow 
                            data = {data}
                        />
                    </tbody>
                )
            }
            {  
                loading && (
                    <>Loading...</>
                )

            }
            
            </Table>
            
        </>
    )
}
