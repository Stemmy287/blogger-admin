import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Blogs} from "features/Blogs/Blogs";
import {Posts} from "features/Posts/Posts";
import {BlogPage} from "features/Blogs/BlogPage/BlogPage";
import {PostPage} from "features/Posts/PostPage/PostPage";
import {BlogEditOrAddPage} from "features/Blogs/BlogEditOrAddPage/BlogEditOrAddPage";
import {PATH} from "common/constants/constants";

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.MAIN} element={<Blogs/>}/>
        <Route path={PATH.BLOGS} element={<Blogs/>}/>
        <Route path={PATH.POSTS} element={<Posts/>}/>
        <Route path={PATH.BLOG_PAGE} element={<BlogPage/>}/>
        <Route path={PATH.POST_PAGE} element={<PostPage/>}/>
        <Route path={PATH.ADD_BLOG} element={<BlogEditOrAddPage
          title={'Blogs'}
          desk={'Add'}
          link={PATH.BLOGS}
          buttonName={'Add Blog'}
        />}/>
        <Route path={PATH.EDIT_BLOG} element={<BlogEditOrAddPage
          buttonName={'Edit Blog'}
          title={'Posts'}
          desk={'Edit'}
          link={'/Blogs'}
          isEdit={true}
        />}/>
      </Routes>
    </div>
  );
};

