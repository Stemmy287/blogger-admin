import React, {useState} from 'react';
import {Title} from "common/components/Title/Title";
import {Blog} from "features/Blogs/Blog/Blog";
import {Button} from "common/components/Button/Button";
import s from 'features/Blogs/blogs.module.scss'
import {useNavigate} from "react-router-dom";
import {PopUp} from "common/components/PopUp/PopUp";
import {Notification} from "common/components/Notification/Notification";
import {deleteBlogTC} from "features/Blogs/blogsReducer";
import {PATH} from "common/constants/constants";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";

export const Blogs = () => {

    const blogs = useAppSelector(state => state.blogs.blogs)
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

