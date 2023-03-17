import React from 'react';
import s from 'app/NavBar/navBar.module.scss'
import {ReactComponent as BurgerMenu} from 'common/icons/Burger.svg'
import {ReactComponent as SquareMenu} from 'common/icons/SquareMenu.svg'
import {ReactComponent as User} from 'common/icons/User.svg'
import {NavBarLink} from "common/components/Link/Link";
import {PATH} from "common/constants/path";

export const NavBar = () => {
  return (
    <div className={s.navBarContainer}>
      <NavBarLink to={PATH.BLOGS} title={'Blogs'} icon={<BurgerMenu/>}/>
      <NavBarLink to={PATH.POSTS} title={'Posts'} icon={<SquareMenu/>}/>
      <NavBarLink to={PATH.USERS} title={'Users'} icon={<User/>}/>
    </div>
  );
};

