import {AxiosResponse} from "axios";
import {ResponseType} from "features/Blogs/blogsApi";
import {headers, instance} from "common/constants/instanceApi";

export const apiPosts = {
  getPosts() {
    return instance.get<ResponseType<Array<PostType>>>(`api/posts?pageSize=15`)
      .then(res => res.data)
  },
  getPost(postId: string) {
    return instance.get<PostType>(`api/posts/${postId}`)
      .then(res => res.data)
  },
  addPost(data: AddOrEditPostType) {
    return instance.post<'', AxiosResponse<AddPostType>, AddOrEditPostType>(`api/posts`, data, {headers})
      .then(res => res.data)
  },
  editPost(postId: string, data: AddOrEditPostType) {
    return instance.put<'', AxiosResponse, AddOrEditPostType>(`api/posts/${postId}`, data,{headers})
      .then(res => res.data)
  },
  deletePost(postId: string) {
    return instance.delete(`api/posts/${postId}`, {headers})
      .then(res => res.data)
  },
}

//types
export type PostType = {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
  extendedLikesInfo: LikeInfoType
}

export type AddPostType = {
  id: string
  title: string
  shortDescription: string
  content: string
  blogId: string
  blogName: string
  createdAt: string
}

export type AddOrEditPostType = {
  title: string
  shortDescription: string
  content: string
  blogId: string
}

export type LikeInfoType = {
  likesCount: number
  dislikesCount: number
  myStatus: string
  newestLikes: Array<NewestLikesType>
}

export type NewestLikesType = {
  addedAt: string
  userId: string
  login: string
}