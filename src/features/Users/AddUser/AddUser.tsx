import React, {FC} from 'react';
import s from './addUser.module.scss'
import {TitlePopUp} from "common/components/TitlePopUp/TitlePopUp";
import {useFormik} from "formik";
import {Input} from "common/components/Input/Input";
import {Button} from "common/components/Button/Button";
import {useAppDispatch} from "hooks/useAppDispatch";
import {addUserTC} from "features/Users/usersSlice";

type Props = {
  onClose: (isActive: boolean) => void
}

export const AddUser:FC<Props> = ({onClose}) => {

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      email: ''
    },
    onSubmit(values) {
      dispatch(addUserTC({user: {login: values.login, password: values.password, email: values.email}}))
      formik.resetForm()
      onClose(false)
    }
  })

  const onCloseHandler = () => {
    formik.resetForm()
    onClose(false)
  }

  return (
    <div className={s.addUserContainer}>
      <TitlePopUp title={'Add User'} onCloseHandler={onCloseHandler}/>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.addUserContent}>
          <Input title={'Specify: Email of the user'} component={'input'} {...formik.getFieldProps('email')}/>
          <Input title={'Username'} component={'input'} {...formik.getFieldProps('login')}/>
          <Input title={'Password'} component={'input'} password {...formik.getFieldProps('password')}/>
          <div className={s.button}>
            <Button type={'submit'} title={'Add user'}/>
          </div>
        </div>
      </form>
    </div>
  );
};

