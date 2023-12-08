"use-client";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { OfferRow } from "./OfferRow";
import lenderLoanService from "@/api-helpers/lenderLoan";

import styles from "../styles/offertable.module.scss"

export default function OfferTable() {

    const [data,setData] = useState([]);

    const getApiData = async() => {
        const result:any = await lenderLoanService.getAllLoanOffers();
        console.log(result);
        if(result){
            setData(result);
        }
    }

    useEffect(()=>{
        getApiData()
    },[])


    const getRows = () => {
        const result: any = [];
        data.map((x:any,index)=>{
            result.push(
                <OfferRow
                    key={index}
                    offerId = {x._id}
                    lender = {x.lender ?? ""}
                    institutionType = {x.institutionType}
                    features = {x.features}
                    interestRate = {x.interestRate}
                    maxTenure = {x.maxTenure}
                    maxAmount = {x.maxAmount}
                    floating = {x.floating}
                    acceptance = {x.acceptance}
                    documentsRequired = {x.documentsRequired}
                    description = {x.description}
                />
            )
        })

        return (
            <>
                {result}
            </>
        );
    }
    return (
        <div className={styles.offertable}>
            
                    {
                        data.length === 0 && (
                            <>Loading...</>
                        )
                    }
                    {
                        data.length > 0 && (
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Lender Name</th>
                                        <th>Type</th>
                                        <th>Features</th>
                                        <th>Interest Rate</th>
                                        <th>Max Amount</th>
                                        <th>Proceed</th>
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
