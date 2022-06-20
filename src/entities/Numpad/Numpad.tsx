import { memo } from 'react';
import { NumpadButton, NumpadButtonThemes } from '../../shared/NumpadButton';
import styles from './Numpad.module.css'

export type NumpadButtonObj = {
  key: string;
  theme?: NumpadButtonThemes;
  actionType?: React.ReducerAction<any>
  synonyms?: string[],
}

export type Key = string | NumpadButtonObj;

type basicAction = {
  default: 'DEFAULT'
}

type NumpadProps = {
  keyboard: Key[][];
  dispatch: React.Dispatch<any & basicAction>;
};

export const Numpad = memo(({ keyboard, dispatch }: NumpadProps) => {
  const handleClick = (cell: Key) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const key = typeof cell === 'object' ? cell.key : cell;
      const hasAction = typeof cell === 'object' && cell.actionType;

      dispatch({ type: hasAction ? cell.actionType : 'DEFAULT', payload: key })
    }
  }
  const theme = (cell: Key) => typeof cell === 'object' && cell.theme ? NumpadButtonThemes.default : NumpadButtonThemes.default;
  const style = { '--columns-count': `${keyboard[0].length}` } as React.CSSProperties;

  return <div className={styles.Numpad} style={style}>
    {keyboard.map((row, i) =>
      <div key={i} className={styles.row}>
        {row.map((cell, j) =>
          <NumpadButton onClick={handleClick(cell)} key={`${i}${j}`} theme={theme(cell)}>
            {typeof cell === 'object' ? cell.key : cell}
          </NumpadButton>)}
      </div>)}
  </div>;
})