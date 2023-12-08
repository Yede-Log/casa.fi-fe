
import { Row, Col, Table } from "react-bootstrap";
import styles from "../styles/loaninfo.module.scss";

interface LoanInfoProps {
//   text: String
}

export const LoanInfo : React.FC<LoanInfoProps> = ({}) => {
  
  return (
    <div className={styles.featurechip}>
        <Row>
            <Col md={6}>
                <Table>
                    <tbody>
                        <tr>
                            <td>Loan ID:</td>
                            <td>LOANICI12345</td>
                        </tr>
                        <tr>
                            <td>Lender Name:</td>
                            <td>ICICI BANK</td>
                        </tr>
                        <tr>
                            <td>Application Date:</td>
                            <td>24 June 2023</td>
                        </tr>
                        <tr>
                            <td>Disbursed Date:</td>
                            <td>29 June 2023</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </div>
  );

}
