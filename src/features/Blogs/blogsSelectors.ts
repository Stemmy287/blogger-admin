import {AppRootStateType} from "app/store";

export const blogsSelector = (state: AppRootStateType) => state.blogsReducer.blogs.items
export const blogSelector = (state: AppRootStateType) => state.blogsReducer.blog

//meta data
export const blogsTotalCountSelector = (state: AppRootStateType) => state.blogsReducer.blogs.totalCount

//query params
export const blogsPageNumberSelector = (state: AppRootStateType) => state.blogsReducer.queryParams.pageNumber

