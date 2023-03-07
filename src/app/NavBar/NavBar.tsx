import React from 'react';
import s from 'app/NavBar/navBar.module.scss'
import burger from 'common/icons/Burger.svg'
import squareMenu from 'common/icons/SquareMenu.svg'
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <div className={s.navBarContainer}>
            <div className={s.navLinks}>
                <NavLink to={'/Blogs'} className={s.navLink}>
                    <div>
                        <img src={burger}/>
                        <span>Blogs</span>
                    </div>
                </NavLink>
                <NavLink to={'/Posts'} className={s.navLink}>
                    <div>
                        <img src={squareMenu} className={s.square}/>
                        <span>Posts</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

