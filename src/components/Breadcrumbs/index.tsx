import Breadcrumb from 'react-bootstrap/Breadcrumb';
import styles from "./styles.module.scss";
import { Container } from 'react-bootstrap';

interface BreadcrumbProps {
    // text: String
    data: Array<{title:String,link:String}>
    active: String
  }
  
  export const BreadcrumbExample : React.FC<BreadcrumbProps> = ({data, active}) => {
  return (
    <Breadcrumb className={styles.customBreadcrumb}>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {
        data.map((x,index)=>{
            return (
                <Breadcrumb.Item key={index} href={""+x.link} >
                    {x.title}
                </Breadcrumb.Item>
            );
        })
      }
      <Breadcrumb.Item active>{active}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

