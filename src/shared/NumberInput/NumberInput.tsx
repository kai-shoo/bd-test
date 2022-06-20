import styles from './NumberInput.module.css';

type NumberInputProps = {
    value: string;
    onChange: React.ChangeEventHandler;
    onKeyDown: React.KeyboardEventHandler
}

export function NumberInput({ value, onChange, onKeyDown }: NumberInputProps) {
    return <input className={styles.NumberInput} value={value} onChange={onChange} onKeyDown={onKeyDown} maxLength={23} />
}