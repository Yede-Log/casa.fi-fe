
import { Row, Col, Card } from "react-bootstrap";
import styles from "./styles.module.scss";

interface SingleInfoCardProps {
  // text: String
  title: String,
  amount: String
}

export const SingleInfoCard : React.FC<SingleInfoCardProps> = ({title,amount}) => {
  
  return (
    <Card>
        <Card.Body>
            <div className={styles.cardbodycontent}>
                <h5>{title}</h5>
                <h3>{amount}</h3>
            </div>
        </Card.Body>
    </Card>
  );

}
