"use-client";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MyLoanRow } from "./MyLoanRow";
// import styles from "../styles/offertable.module.scss"
import lenderLoanService from "@/api-helpers/lenderLoan";
import useUser from "@/hooks/useUser";


export default function MyLoansTable() {

    const [loading,setLoading] = useState(true);
    const [data,setData] = useState([]);
    const { userAddress } = useUser();

    const getApiData = async() => {
        const result:any = await lenderLoanService.getMyLoans(userAddress);
        console.log(result);
        if(result){
            setData(result);
            setLoading(false);
        }
    }
    useEffect(()=>{
        getApiData();
    },[])

    const getRows = () => {
        const result : any = [];

        data.map((x:any,index)=>{
            result.push(
            <MyLoanRow 
                key={index}
                accId={x._id}
                lender={x.lender}
                interestRate={x.interestRate}
                amount={x.amount}
                status={x.status}
            />)
        });

        return <>{result}</>
    }
    return (
        <div >
            {
                loading ? (
                    <>Loading...</>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Loan Application ID</th>
                                <th>Lender Name</th>
                                <th>Interest Rate</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getRows()}
                        </tbody>
                    </Table>
                )
            }
            
        </div>
    )
}
