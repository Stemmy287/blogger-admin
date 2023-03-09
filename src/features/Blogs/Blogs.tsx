import React, {useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import {Blog} from "features/Blogs/Blog/Blog";
import {Button} from "common/components/Button/Button";
import s from 'features/Blogs/blogs.module.scss'
import {useNavigate} from "react-router-dom";
import {PopUp} from "common/components/PopUp/PopUp";
import {Notification} from "common/components/Notification/Notification";
import {deleteBlogTC, fetchBlogsTC} from "features/Blogs/blogsReducer";
import {PATH} from "common/constants/path";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {blogsSelector} from "features/Blogs/blogsSelectors";

export const Blogs = () => {

    const blogs = useAppSelector(blogsSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const navigateHandler = () => {
        navigate(PATH.ADD_BLOG)
    }
    const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false)
    const [blogId, setBlogId] = useState('')

    const deleteBlogHandler = () => {
        dispatch(deleteBlogTC({blogId}))
    }

  useEffect(() => {
    dispatch(fetchBlogsTC())
  }, [])

    return (
        <div>
            <Title title="Blogs" isDesc={false}/>
            <div className={s.button}>
                <Button title={'Add Blog'} callback={navigateHandler}/>
            </div>
            {blogs.map(bg => <Blog
                    key={bg.id}
                    blogId={bg.id}
                    title={bg.name}
                    webSiteUrl={bg.websiteUrl}
                    description={bg.description}
                    popUpInfo={setIsDeletePopUpActive}
                    setBlogId={setBlogId}
                />
            )}
            <PopUp isActive={isDeletePopUpActive} setIsActive={setIsDeletePopUpActive}>
                <Notification title={'Delete a Blog'} message={'Are you sure you want to delete this Blog?'}
                              callback={deleteBlogHandler}
                              onClose={setIsDeletePopUpActive}
                />
            </PopUp>
        </div>
    );
};

