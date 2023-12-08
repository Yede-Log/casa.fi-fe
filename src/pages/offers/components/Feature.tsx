
import styles from "../styles/feature.module.scss";

interface FeatureProps {
  text: String
}

export const Feature : React.FC<FeatureProps> = ({text}) => {
  
  return (
    <div className={styles.featurechip}>
      {text}
    </div>
  );

}
