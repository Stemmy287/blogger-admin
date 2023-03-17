import React from 'react';
import s from 'app/Header/header.module.scss'

export const Header = () => {
  return (
    <header className={s.headerContainer}>
      <h2>Blogger Platform</h2>
      <span>Superadmin</span>
    </header>
  );
};

