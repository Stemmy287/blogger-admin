import React, {FC} from 'react';
import s from 'features/Posts/Post/post.module.scss'
import {NavLink} from "react-router-dom";
import {BurgerMenu} from "common/components/BurgerMenu/BurgerMenu";
import defaultPostImage from 'common/image/Best-times-to-post-2022_BTTP-Social-Media.jpg'
import defaultBlogImage from 'common/image/blog2.png'
import {dateConvertor} from "common/utils/dateConvertor";

type PostPropsType = {
  postId: string
  title: string
  blogName: string
  date: string
  setDeletePopUp?: (action: boolean) => void
  setEditPopUp?: (action: boolean) => void
  setPostId?: (id: string) => void
}

export const Post: FC<PostPropsType> = ({
                                          postId,
                                          title,
                                          blogName,
                                          date,
                                          setDeletePopUp,
                                          setEditPopUp,
                                          setPostId
                                        }) => {

  const dateParsed = dateConvertor(date)

  const onDeleteClickHandler = () => {
    setDeletePopUp && setDeletePopUp(true)
    setPostId && setPostId(postId)
  }

  const onEditClickHandler = () => {
    setEditPopUp && setEditPopUp(true)
    setPostId && setPostId(postId)
  }

  return (
    <div className={s.postContainer}>
      <div className={s.banner}>
        <img src={defaultPostImage} alt="post image"/>
      </div>
      <div className={s.burgerAndMenu}>
        <div className={s.content}>
          <div className={s.img}>
            <img src={defaultBlogImage} alt=""/>
          </div>
          <div className={s.text}>
            <NavLink to={`/postPage/${postId}`} className={s.navPost}>
              <h3 className={s.title}>{title}</h3>
            </NavLink>
            <span className={s.description}>{blogName}</span>
            <span className={s.date}>{dateParsed}</span>
          </div>
        </div>
        <BurgerMenu onEditClick={onEditClickHandler} onDeleteClick={onDeleteClickHandler}/>
      </div>
    </div>
  );
};

