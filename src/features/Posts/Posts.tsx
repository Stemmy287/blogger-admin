import React, {useEffect, useState} from 'react';
import s from 'features/Posts/posts.module.scss'
import {Title} from "common/components/Title/Title";
import {Post} from "features/Posts/Post/Post";
import {deletePostTC, fetchPostsTC} from "features/Posts/postsReducer";
import {Button} from "common/components/Button/Button";
import {Notification} from "common/components/Notification/Notification";
import {PopUp} from "common/components/PopUp/PopUp";
import {PostEditOrAddPage} from "features/Posts/PostEditOrAddPage/PostEditOrAddPage";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {postsSelector} from "features/Posts/postsSelectors";
import {blogsSelector} from "features/Blogs/blogsSelectors";

export const Posts = () => {

  const posts = useAppSelector(postsSelector)
  const blogs = useAppSelector(blogsSelector)
  const dispatch = useAppDispatch()

  const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false)
  const [isEditPopUpActive, setIsEditPopUpActive] = useState(false)
  const [isAddPopUpActive, setIsAddPopUpActive] = useState(false)
  const [postId, setPostId] = useState('')

  const deletePostHandler = () => {
    dispatch(deletePostTC({postId}))
  }

  const addPostHandler = () => {
    setIsAddPopUpActive(true)
  }

  useEffect(() => {
    dispatch(fetchPostsTC())
  }, [])

  return (
    <div>
      <Title title={'Posts'} isDesc={false}/>
      <div className={s.button}>
        <Button title={'Add Post'} callback={addPostHandler}/>
      </div>
      <div className={s.posts}>
        {posts.map(ps =>
          <Post
            key={ps.id}
            postId={ps.id}
            title={ps.title}
            blogName={ps.blogName}
            date={ps.createdAt}
            setDeletePopUp={setIsDeletePopUpActive}
            setEditPopUp={setIsEditPopUpActive}
            setPostId={setPostId}
          />)}
      </div>
      <PopUp isActive={isDeletePopUpActive} setIsActive={setIsDeletePopUpActive}>
        <Notification title={'Delete a Post'} message={'Are you sure you want to delete this Post?'}
                      callback={deletePostHandler}
                      onClose={setIsDeletePopUpActive}
        />
      </PopUp>
      <PopUp isActive={isAddPopUpActive} setIsActive={setIsAddPopUpActive}>
        <PostEditOrAddPage blogs={blogs} isAdd onClose={setIsAddPopUpActive} title={'Add Post'}/>
      </PopUp>
      <PopUp isActive={isEditPopUpActive} setIsActive={setIsEditPopUpActive}>
        <PostEditOrAddPage postId={postId} onClose={setIsEditPopUpActive} title={'Edit Post'}/>
      </PopUp>
    </div>
  );
};

