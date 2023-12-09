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
        console.log(userAddress)
        if(userAddress){
            getApiData();
        }
        
    },[userAddress])

    const getRows = () => {
        const result : any = [];

        data.map((x:any,index)=>{
            result.push(
            <MyLoanRow 
                key={index.toString()}
                accId={x.application_id}
                lender={x.lender}
                interestRate={x.interest_rate}
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
                                <th>Asset ID</th>
                                <th>Contract ID</th>
                                <th>Application Date</th>
                                <th>Action</th>
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
