"use-client"

import { Table, Nav, Tab, Button } from "react-bootstrap";
import LoanRequestsRow from "./LoanRequestsRow";
import LenderOfferMain from "./LenderOfferMain";
import OutstandingLenderLoanMain from "./OutstandingLenderLoanMain";
import ClearedLoanMain from "./ClearedLoanMain";
// import styles from "../styles/offertable.module.scss"
import styles from "../styles/tabs.module.scss";

export default function LenderLoanTable() {
  
    return (
    <div className={styles.myTabs} >
        <Tab.Container  defaultActiveKey="outstanding">
            <Nav variant="tabs" defaultActiveKey="outstanding">
                <Nav.Item>
                    <Nav.Link eventKey="outstanding">Outstanding Loans</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="cleared">Cleared Loans</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="requests">
                        Loan Requests
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="offers">
                        My Loan Offers
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="outstanding" className="pt-3">
                    {/* <h5>Outstanding Loans</h5> */}
                   <OutstandingLenderLoanMain />
                </Tab.Pane>
                <Tab.Pane eventKey="cleared" className="pt-3"> 
                    <ClearedLoanMain />
                </Tab.Pane>
                <Tab.Pane eventKey="requests" className="pt-3">
                    <LoanRequestsRow />
                </Tab.Pane>
                <Tab.Pane eventKey="offers" className="pt-3">
                    <LenderOfferMain />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
        
    </div>
  )
}
