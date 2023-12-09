
import { Row, Col, Table } from "react-bootstrap";
import styles from "../styles/loaninfo.module.scss";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import lenderLoanService from "@/api-helpers/lenderLoan";
import moment from "moment";

interface LoanInfoProps {
    offer_id: String
}

export const LoanInfo : React.FC<LoanInfoProps> = ({offer_id}) => {

    const [loading,setLoading] = useState(true);
    const [data,setData] = useState<any>([]);
    const { userAddress } = useUser();

    const getApiData = async() => {
        
        const result:any = await lenderLoanService.getLoanById(offer_id);
        console.log(result);
        if(result){
            setData(result);
            setLoading(false);
        }
    }

    useEffect(()=>{
        // console.log(userAddress)
        if(userAddress){
            getApiData();
        }
        
    },[userAddress])

    const getRows = () => {
        const result : any = [];
        
        data.map((x:any,index:Number)=> {
            result.push(
                <tbody key={index.toString()}>
                        <tr>
                            <td>Loan ID:</td>
                            <td>{x.lender}</td>
                        </tr>
                        <tr>
                            <td>Lender Name:</td>
                            <td>{x.lender}</td>
                        </tr>
                        <tr>
                            <td>Application Date:</td>
                            <td>{moment(x.createdAt).format('llll')}</td>
                        </tr>
                        <tr>
                            <td>Disbursed Date:</td>
                            <td>{moment(x.updatedAt).format('llll') ?? "-"}</td>
                        </tr>
                </tbody>
            )
        });

        return result;
    }
  
  return (
    <div className={styles.featurechip}>
        <Row>
            <Col md={6}>
                <Table>
                    {getRows()}
                </Table>
            </Col>
        </Row>
    </div>
  );

}
