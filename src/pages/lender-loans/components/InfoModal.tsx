"use-client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import Link from 'next/link';

import styles from "../styles/infomodal.module.scss";
// import styles2 from "../styles/offertable.module.scss";

interface InfoProps {
    showProps: boolean,
    handleClose: () => void
}

export const InfoModal : React.FC<InfoProps> = ({showProps,handleClose}) => {
  
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
          <Modal.Title className={styles.infomodaltitle}>LOANICIAPP1245</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table>
                <tbody>
                    <tr>
                        <td>Lendee Name: </td>
                        <td>John Doe </td>
                    </tr>
                    <tr>
                        <td>Application Date: </td>
                        <td>23 June 2023 </td>
                    </tr>
                    <tr>
                        <td>EMI: </td>
                        <td>USD 450 </td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td>In Progress </td>
                    </tr>
                    <tr>
                        <td>Documents: </td>
                        <td>Link </td>
                    </tr>
                </tbody>
            </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InfoModal;