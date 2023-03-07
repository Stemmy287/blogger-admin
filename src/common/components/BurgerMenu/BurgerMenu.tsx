import React, {FC, useState} from 'react';
import s from 'common/components/BurgerMenu/burgerMenu.module.scss';
import burgerMenu from 'common/icons/BurgerMenu.svg';
import editIcon from 'common/icons/Edit.svg'
import deleteIcon from 'common/icons/Delete.svg'

type BurgerMenuType = {
    onEditClick: () => void
    onDeleteClick: () => void
}

export const BurgerMenu: FC<BurgerMenuType> = ({
                                                   onEditClick,
                                                   onDeleteClick
                                               }) => {

    const [isMenu, setIsMenu] = useState(false)

    const onClickBurgerHandler = () => {
        setIsMenu(true)
    }
    const onBlurButtonsHandler = () => {
        setIsMenu(false)
    }
    const onClickEditHandler = () => {
        onEditClick()
    }
    const onClickDeleteHandler = () => {
        onDeleteClick()
    }

    return (
        <div id="popUp" className={s.burgerMenuContainer}>
            <img src={burgerMenu} className={s.burger} onClick={onClickBurgerHandler}/>
            {isMenu && <div className={s.buttons} onBlur={onBlurButtonsHandler}>
                <button className={s.button} onClick={onClickDeleteHandler}>
                    <img src={deleteIcon}/>
                    <span>Delete</span>
                </button>
                <button className={s.button} onClick={onClickEditHandler}>
                    <img src={editIcon}/>
                    <span>Edit</span>
                </button>
            </div>}
        </div>
    );
};
