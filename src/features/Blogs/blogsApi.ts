import {AxiosResponse} from "axios";
import {headers, instance} from "common/constants/instanceApi";

export const apiBlogs = {
  getBlogs(data: QueryParamsType) {
    return instance.get<ResponseType<Array<BlogType>>>(`api/blogs`, {params: data})
      .then(res => res.data)
  },
  getBlog(blogId: string) {
    return instance.get<BlogType>(`api/blogs/${blogId}`)
      .then(res => res.data)
  },
  addBlog(data: AddOrEditBlogType) {
    return instance.post<'', AxiosResponse<BlogType>, AddOrEditBlogType> (`api/blogs/`, data, {headers})
      .then(res => res.data)
  },
  editBlog(blogId: string, data: AddOrEditBlogType) {
    return instance.put<'', AxiosResponse, AddOrEditBlogType>(`api/blogs/${blogId}`, data, {headers})
      .then(res => res.data)
  },
  deleteBlog(blogId: string) {
    return instance.delete(`api/blogs/${blogId}`, {headers})
  }
}

//types
export type BlogType = {
  id: string
  name: string
  description: string
  websiteUrl: string
  createdAt: string
}

export type AddOrEditBlogType = {
  name: string
  description: string
  websiteUrl: string
}

export type ResponseType<T> = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: T
}

export type QueryParamsType = {
  pageNumber: number
  pageSize: number
}