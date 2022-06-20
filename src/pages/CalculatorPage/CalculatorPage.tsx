import styles from './CalculatorPage.module.css';
import { Calculator } from '../../widgets/Calculator';

export function CalculatorPage() {
    return <div className={styles.CalculatorPage}>
        <Calculator />
    </div>;
}
