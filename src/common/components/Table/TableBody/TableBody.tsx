import React, {FC} from 'react';
import {UserType} from "features/Users/usersApi";
import s from './tableBody.module.scss'
import {ReactComponent as Trash} from "common/icons/Trash.svg";
import {dateConvertor} from "common/utils/dateConvertor";

type Props = {
  users: UserType[]
  setUserId: (userId: string) => void
  setIsPopUpActive: (isActive: boolean) => void
}

export const TableBody:FC<Props> = ({users, setUserId, setIsPopUpActive}) => {

  const onDeleteClickHandler = (id: string) => {
    setIsPopUpActive(true)
    setUserId(id)
  }

  return (
    <tbody>
      {users.map(us =>
        <tr key={us.id} className={s.cells}>
          <td>{us.login}</td>
          <td>{us.email}</td>
          <td>{us.id}</td>
          <td>{dateConvertor(us.createdAt)}</td>
          <td className={s.textEnd}><Trash className={s.delete} onClick={() => {onDeleteClickHandler(us.id)}}/></td>
        </tr>
      )}
    </tbody>
  );
};

