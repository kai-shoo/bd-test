import styles from './NumpadButton.module.css';

export enum NumpadButtonThemes {
    default = 'default',
    action = 'action',
}

type NumpadButtonProps = {
    children: React.ReactNode;
    theme: NumpadButtonThemes;
    onClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

const handleMouseDown: React.MouseEventHandler = (event) => {
    event.preventDefault();
    try {
        (document.activeElement as HTMLElement).blur();
    } catch (err) {
        console.error(err)
    }
}

export function NumpadButton({ theme = NumpadButtonThemes.default, children, onClick }: NumpadButtonProps) {
    return <button className={`${styles.NumpadButton} ${styles[theme]}`} onClick={onClick} onMouseDown={handleMouseDown}>{children}</button>
}