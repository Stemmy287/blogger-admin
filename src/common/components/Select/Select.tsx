import React, {ChangeEvent, FC} from 'react';
import s from "common/components/Select/select.module.scss";

type Props = {
  onChange: (value: string) => void
  selectValue: string
  options: string[]
}

export const Select:FC<Props> = ({onChange, selectValue, options}) => {

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <select className={s.select} value={selectValue} onChange={onChangeHandler}>
      {options.map(el => <option key={el} value={el}>{el}</option>)}
    </select>
  );
};

