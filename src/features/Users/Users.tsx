import React from 'react';
import {Title} from "common/components/Title/Title";
import s from './users.module.scss'
import {Button} from "common/components/Button/Button";

export const Users = () => {
  return (
    <>
      <Title title={'Users'}/>
      <div className={s.button}>
        <Button title={'Add User'} callback={() => {}}/>
      </div>
    </>
  );
};

