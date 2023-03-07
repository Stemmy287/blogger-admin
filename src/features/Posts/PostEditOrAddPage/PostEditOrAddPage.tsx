import React, {FC, useState} from 'react';
import s from 'features/Posts/PostEditOrAddPage/postEditOrAddPage.module.scss'
import {TitlePopUp} from "common/components/TitlePopUp/TitlePopUp";
import {Input} from "common/components/Input/Input";
import {Button} from "common/components/Button/Button";
import {useFormik} from "formik";
import {addPostTC, editPostTC} from "features/Posts/postsReducer";
import {BlogType} from "features/Blogs/blogsApi";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";


type PostEditOrAddPageType = {
  title: string
  isAdd?: boolean
  onClose: (isActive: boolean) => void
  blogs?: Array<BlogType>
  postId?: string
}

export const PostEditOrAddPage: FC<PostEditOrAddPageType> = ({
                                                               title,
                                                               isAdd,
                                                               onClose,
                                                               blogs,
                                                               postId
                                                             }) => {

  const dispatch = useAppDispatch()
  const [blogId, setBlogId] = useState('')
  const posts = useAppSelector(state => state.posts.posts)
  const post = posts.find(el => el.id === postId)

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : '',
      content: post ? post.content : ''
    },
    onSubmit(values) {
      if (isAdd) {
        dispatch(addPostTC({data: {...values, shortDescription: 'some', blogId}}))
      } else {
        dispatch(editPostTC({postId: postId || '', data: {...values, shortDescription: 'some', blogId: post?.blogId || ''}}))
      }

      onClose(false)
    }
  })

  const onCloseHandler = () => {
    onClose(false)
  }

  const blogsOptions = blogs?.map(el => <option key={el.id} value={el.id}>{el.name}</option>)

  return (
    <div className={s.postEditOrAddPageContainer}>
      <TitlePopUp title={title} onCloseHandler={onCloseHandler}/>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.postEditOrAddPageContent}>
          <img className={s.image} src="" alt=""/>
          <Input title={'PostName'} component={'input'} {...formik.getFieldProps('title')}/>
          {isAdd &&
              <div className={s.selector}>
                  <span>Blog</span>
                  <select onChange={(e) => {setBlogId(e.currentTarget.value)}}>
                    {blogsOptions}
                  </select>
              </div>
          }
          <Input title={'Description'} component={'textarea'} {...formik.getFieldProps('content')}/>
          <div className={s.button}>
            <Button type={'submit'} title={'Publish'}/>
          </div>
        </div>
      </form>
    </div>
  );
};

