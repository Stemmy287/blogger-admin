import React, {useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import s from './users.module.scss'
import {Button} from "common/components/Button/Button";
import {TableHead} from "common/components/Table/TableHead/TableHead";
import {TableBody} from "common/components/Table/TableBody/TableBody";
import {useAppSelector} from "hooks/useAppSelector";
import {
  usersPageSelector,
  usersPageSizeSelector,
  usersSelector,
  usersTotalCountSelector
} from "features/Users/usersSelectors";
import {useAppDispatch} from "hooks/useAppDispatch";
import {deleteUserTC, fetchUsersTC, setPageNumber, setPageSize} from "features/Users/usersSlice";
import {Notification} from "common/components/Notification/Notification";
import {PopUp} from "common/components/PopUp/PopUp";
import {AddUser} from "features/Users/AddUser/AddUser";
import {Pagination} from "common/components/Pagintaton/Pagination";

export const Users = () => {

  const users = useAppSelector(usersSelector)

  const currentPage = useAppSelector(usersPageSelector)
  const pageSize = useAppSelector(usersPageSizeSelector)

  const usersTotalCount = useAppSelector(usersTotalCountSelector)

  const dispatch = useAppDispatch()

  const [isAddUserPopUpActive, setIsAddUserPopUpActive] = useState(false)
  const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false)
  const [userId, setUserId] = useState('')

  const deleteUserHandler = () => {
    dispatch(deleteUserTC({userId}))
  }

  const onPageChangeHandler = (currentPage: number) => {
    dispatch(setPageNumber({pageNumber: currentPage}))
  }

  const onPageSizeChange = (pageSize: string) => {
    dispatch(setPageSize({pageSize: +pageSize}))
  }

  useEffect(() => {
    dispatch(fetchUsersTC())
  }, [currentPage, pageSize])

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
      {!!users.length && <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItemsCount={usersTotalCount}
        siblingCount={1}
        onPageChange={onPageChangeHandler}
        onPageSizeChange={onPageSizeChange}
      />}
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

