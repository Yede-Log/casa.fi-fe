"use-client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';

import styles from "../styles/infomodal.module.scss";
import styles2 from "../styles/offertable.module.scss";

interface InfoProps {
    showProps: boolean,
    handleClose: () => void,
    offerId: String,
    lender : String,
    institutionType : String,
    features : Array<String>,
    interestRate : Number,
    maxTenure : Number,
    maxAmount : Number,
    floating : Boolean,
    acceptance : Number,
    documentsRequired : Array<String>,
    description : String
}

export const InfoModal : React.FC<InfoProps> = ({showProps,handleClose,
    offerId,
    lender,
    institutionType,
    features,
    interestRate,
    maxTenure ,
    maxAmount,
    floating ,
    acceptance ,
    documentsRequired,
    description}) => {
  
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
          <Modal.Title className={styles.infomodaltitle}>{lender}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={styles.featurelist}>
                <div className={styles.featurelistdiv}>
                    <h4>Interest Rate</h4>
                    <h5>{interestRate.toString()}%</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Max Tenure</h4>
                    <h5>{maxTenure.toString()} months</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Max Amount</h4>
                    <h5>${maxAmount.toString()}</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Floating Interest</h4>
                    <h5>{floating ? "Yes" : "No"}</h5>
                </div>
                <div className={styles.featurelistdiv}>
                    <h4>Acceptance </h4>
                    <h5>{acceptance.toString()} Days</h5>
                </div>
            </div>
            <h5>Documents Needed</h5>
            <ol className={styles.terms}>
                {
                    documentsRequired.map(x=>{
                        return <li>{x}</li>
                    })
                }
            </ol>
            <h5>About {lender}</h5>
            <p>{description}</p>
            
            
            
            <h5>Terms and Conditions</h5>
            <ol className={styles.terms}>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
            </ol>
        </Modal.Body>
        <Modal.Footer>
            <Button className={styles2.applybtn} href={"/apply-loan/"+offerId}>Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModal;