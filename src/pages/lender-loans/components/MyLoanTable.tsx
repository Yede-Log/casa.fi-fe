import { Table, Nav } from "react-bootstrap";

export default function LenderLoansTable() {
  return (
    <div >
        

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Loan Account ID</th>
                    <th>Lender Name</th>
                    <th>Interest Rate</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {/* <MyLoanRow /> */}
            </tbody>
        </Table>
    </div>
  )
}
