import React, {FC} from 'react';
import s from 'features/Blogs/Blog/blog.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {BurgerMenu} from "common/components/BurgerMenu/BurgerMenu";
import {PATH} from "common/constants/path";
import defaultBlogImage from 'common/image/blog2.png'

type BlogsPropsType = {
    blogId: string
    title: string
    webSiteUrl: string
    description: string
    popUpInfo?:(action: boolean) => void
    setBlogId?: (id: string) => void
}

export const Blog: FC<BlogsPropsType> = ({
                                             blogId,
                                             title,
                                             webSiteUrl,
                                             description,
                                             popUpInfo,
                                             setBlogId
                                         }) => {

    const navigate = useNavigate()

    const onEditClickHandler = () => {
        navigate(PATH.EDIT_BLOG, {state: {blogId: blogId, blogName: title, webSiteUrl, description}})
    }
    const onDeleteClickHandler = () => {
        popUpInfo && popUpInfo(true)
        setBlogId && setBlogId(blogId)
    }

    return (
        <div className={s.blogContainer}>
            <div className={s.photo}>
                <img src={defaultBlogImage} alt={'blogImage'}/>
            </div>
          <div className={s.contentAndBurgerMenu}>
            <div className={s.content}>
              <NavLink to={`/BlogPage/${blogId}`} className={s.navBlog}>
                <h3 className={s.title}>{title}</h3>
              </NavLink>
              <span className={s.website}><b>Website:</b><a href="">{webSiteUrl}</a></span>
              <span className={s.text}>{description}</span>
            </div>
            <div className={s.burgerMenu}>
              <BurgerMenu onEditClick={onEditClickHandler} onDeleteClick={onDeleteClickHandler}/>
            </div>
          </div>
        </div>
    );
};

