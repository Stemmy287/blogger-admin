import React, {FC} from 'react';
import s from "./tableHead.module.scss";

type Props = {
  rows: string[]
}

export const TableHead: FC<Props> = ({rows}) => {
  return (
    <thead>
    <tr>
      {rows.map((el, i) => <th className={s.row} key={i}>{el}</th>)}
    </tr>
    </thead>
  );
};

