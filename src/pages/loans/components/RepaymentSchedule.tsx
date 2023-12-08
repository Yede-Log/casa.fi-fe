
import { Row, Col, Table } from "react-bootstrap";
import styles from "../styles/loaninfo.module.scss";

interface RepaymentScheduleProps {
//   text: String
}

export const RepaymentSchedule : React.FC<RepaymentScheduleProps> = ({}) => {
  
  return (
    <div>
        <h5>Repayment Schedule</h5>
        <Table>
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Date</th>
                    <th>EMI</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>6th July 2023</td>
                    <td>490</td>
                    <td>Paid</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>6th August 2023</td>
                    <td>490</td>
                    <td>Paid</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>6th September 2023</td>
                    <td>490</td>
                    <td>Paid</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>6th October 2023</td>
                    <td>490</td>
                    <td>Paid</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>6th November 2023</td>
                    <td>490</td>
                    <td>Paid</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>6th December 2023</td>
                    <td>490</td>
                    <td>Unpaid</td>
                </tr>
            </tbody>
        </Table>
    </div>
  );

}
