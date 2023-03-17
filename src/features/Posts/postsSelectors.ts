import {AppRootStateType} from "app/store";

export const postsSelector = (state: AppRootStateType) => state.posts.posts.items
export const postSelector = (state: AppRootStateType) => state.posts.post

//meta data
export const postsTotalCountSelector = (state: AppRootStateType) => state.posts.posts.totalCount

//query params
export const postsPageNumberSelector = (state: AppRootStateType) => state.posts.queryParams.pageNumber

