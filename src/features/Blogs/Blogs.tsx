import React, {useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import {Blog} from "features/Blogs/Blog/Blog";
import {Button} from "common/components/Button/Button";
import s from 'features/Blogs/blogs.module.scss'
import {useNavigate} from "react-router-dom";
import {PopUp} from "common/components/PopUp/PopUp";
import {Notification} from "common/components/Notification/Notification";
import {deleteBlogTC, fetchBlogsTC, setIsPaginationBlogsAC, setPageNumberBlogsAC} from "features/Blogs/blogsSlice";
import {PATH} from "common/constants/path";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {blogsPageNumberSelector, blogsSelector, blogsTotalCountSelector} from "features/Blogs/blogsSelectors";
import {Pagination} from "common/components/Pagination/Pagination";
import {setPageNumberPostsAC} from "features/Posts/postsSlice";

export const Blogs = () => {

  const blogs = useAppSelector(blogsSelector)

  const pageNumber = useAppSelector(blogsPageNumberSelector)

  const blogsTotalCount = useAppSelector(blogsTotalCountSelector)

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
    dispatch(setPageNumberPostsAC({pageNumber: 1}))
    dispatch(fetchBlogsTC())
  }, [pageNumber])

  const onPagination = () => {
    dispatch(setIsPaginationBlogsAC({isPagination: true}))
    dispatch(setPageNumberBlogsAC({pageNumber: pageNumber + 1}))
  }

  return (
    <>
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
      {blogsTotalCount > blogs.length  && <Pagination callback={onPagination}/>}
      <PopUp isActive={isDeletePopUpActive} setIsActive={setIsDeletePopUpActive}>
        <Notification title={'Delete a Blog'} message={'Are you sure you want to delete this blog?'}
                      callback={deleteBlogHandler}
                      onClose={setIsDeletePopUpActive}
        />
      </PopUp>
    </>
  );
};

