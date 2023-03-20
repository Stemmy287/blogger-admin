import React, {useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import s from './users.module.scss'
import {Button} from "common/components/Button/Button";
import {TableHead} from "common/components/Table/TableHead/TableHead";
import {TableBody} from "common/components/Table/TableBody/TableBody";
import {useAppSelector} from "hooks/useAppSelector";
import {usersSelector} from "features/Users/usersSelectors";
import {useAppDispatch} from "hooks/useAppDispatch";
import {deleteUserTC, fetchUsersTC} from "features/Users/usersSlice";
import {Notification} from "common/components/Notification/Notification";
import {PopUp} from "common/components/PopUp/PopUp";
import {AddUser} from "features/Users/AddUser/AddUser";

export const Users = () => {

  const users = useAppSelector(usersSelector)

  const dispatch = useAppDispatch()

  const [isAddUserPopUpActive, setIsAddUserPopUpActive] = useState(false)
  const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false)
  const [userId, setUserId] = useState('')

  const deleteUserHandler = () => {
    dispatch(deleteUserTC({userId}))
  }

  useEffect(() => {
    dispatch(fetchUsersTC())
  }, [])

  return (
    <>
      <Title title={'Users'}/>
      <div className={s.button}>
        <Button title={'Add User'} callback={() => setIsAddUserPopUpActive(true)}/>
      </div>
      <table className={s.table}>
        <TableHead rows={['Username', 'Email', 'User ID', 'Date added', '']}/>
        <TableBody users={users} setUserId={setUserId} setIsPopUpActive={setIsDeletePopUpActive}/>
      </table>
      <PopUp isActive={isAddUserPopUpActive} setIsActive={setIsAddUserPopUpActive}>
          <AddUser onClose={setIsAddUserPopUpActive}/>
      </PopUp>
      <PopUp isActive={isDeletePopUpActive} setIsActive={setIsDeletePopUpActive}>
        <Notification title={'Delete a User'} message={'Are you sure you want to delete this user?'}
                      callback={deleteUserHandler}
                      onClose={setIsDeletePopUpActive}
        />
      </PopUp>
    </>
  );
};

