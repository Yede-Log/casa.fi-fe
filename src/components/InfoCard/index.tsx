
import { Row, Col, Card } from "react-bootstrap";
import styles from "./styles.module.scss";
import { SingleInfoCard } from "@/components/SingleInfoCard/index"

interface InfoCardProps {
  // text: String
  data: Array<{title:String,amount:String}>
}

export const InfoCard : React.FC<InfoCardProps> = ({data}) => {
  
  return (
    <>
      <h4>Loan Details</h4>
      <p>Below is the summary of your loan</p>
      <Row className={styles.infocard}>
        {
            data.map((x,index)=>{
                return (
                    <Col md={3} key={index} className="mt-3">
                        <SingleInfoCard
                        title={x.title}
                        amount={x.amount}
                        />
                    </Col>
                )
            })
        }
      </Row>
    </>
  );

}
