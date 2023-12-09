"use-client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table, Col, Row, Form } from 'react-bootstrap';
import Link from 'next/link';
import Swal from 'sweetalert2';

import styles from "../styles/infomodal.module.scss";
import { useState } from 'react';
import lenderLoanService from '@/api-helpers/lenderLoan';
import useUser from '@/hooks/useUser';
// import styles2 from "../styles/offertable.module.scss";

interface InfoProps {
    showProps: boolean,
    handleClose: () => void
}

export const CreateLoanModal : React.FC<InfoProps> = ({showProps,handleClose}) => {

    const [maxAmount, setMaxAmount] = useState(0);
    const [interest,setInterest] = useState(0);
    const [maxTenure,setMaxTenure] = useState(0);
    const { userAddress } = useUser();


    const handleClick = async(evt:any) => {
        evt.preventDefault();

        const body = {
            "institutionType": "DAO",
            "features": ["Feature1", "Feature2"],
            "interestRate": interest,
            "maxTenure": maxTenure,
            "maxAmount": maxAmount,
            "floating": false,
            "acceptance": 60,
            "documentsRequired": ["PAN Card", "Aadhar Card"],
            "description": "Sample Loan Offer Description",
            "lender": userAddress
        }

        const result = await lenderLoanService.createLoanOffer(body);
        console.log(result);

        if(result){
            Swal.fire({
                title: "Success",
                text:"",              
                icon: "success",
                showCancelButton: true,
            }).then((result:any) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
        }
        else{
            Swal.fire({
                title: "Error",
                text:"",              
                icon: "error",
                showCancelButton: true,
            }).then((result:any) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
        }

        

    }

  return (
    <>
        <Modal 
            show={showProps} 
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={styles.infomodal}
        >
        <Modal.Header closeButton>
          <Modal.Title className={styles.infomodaltitle}>Create an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Max Amount *</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter amount"
                        value={maxAmount} 
                        onChange={(e)=>{
                            setMaxAmount(parseInt(e.target.value))
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                        Enter the amount in USD
                    </Form.Text>
                </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Interest *</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter interest"
                        value={interest} 
                        onChange={(e)=>{
                            setInterest(parseFloat(e.target.value));
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                        Enter the interest rate
                    </Form.Text>
                </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Max Tenure *</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter max tenure"
                        value={maxTenure} 
                        onChange={(e)=>{
                            setMaxTenure(parseFloat(e.target.value));
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                        Enter the max tenure
                    </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Button type="submit" onClick={(evt) => handleClick(evt)}>Submit</Button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateLoanModal;