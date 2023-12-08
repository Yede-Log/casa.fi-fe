
import { Button } from "react-bootstrap";
import styles from "../styles/filters.module.scss";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsArrowRepeat } from "react-icons/bs";


interface FilterProps {
    // text: String
}

export const Filters : React.FC<FilterProps> = ({}) => {
  
    return (
        <div className={styles.filters}>
            <div className="d-flex">
                <h5>Filters</h5>
            </div>
            <div>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-sm">Type</InputGroup.Text>
                    <Form.Select aria-label="Default select example">
                        {/* <option>Open this select menu</option> */}
                        <option value="1">All</option>
                        <option value="2">DAO</option>
                        <option value="3">Individuals</option>
                    </Form.Select> 
                </InputGroup>
                
            </div>
            <div>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-sm">Interest Rate</InputGroup.Text>
                    <Form.Select aria-label="Default select example">
                        {/* <option>Open this select menu</option> */}
                        <option value="1">All</option>
                        <option value="2">&gt;6%</option>
                        <option value="3">&lt;6%</option>
                    </Form.Select> 
                </InputGroup> 
            </div>
            <div>
            <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-sm">Floating Rate</InputGroup.Text>
                    <Form.Select aria-label="Default select example">
                        {/* <option>Open this select menu</option> */}
                        <option value="1">All</option>
                        <option value="2">Yes</option>
                        <option value="3">No</option>
                    </Form.Select> 
                </InputGroup> 
            </div>
            <div>
                <Button className={styles.filterbtn}>Reset Filter &nbsp;<BsArrowRepeat /></Button>
            </div>
        </div>
    );

}
