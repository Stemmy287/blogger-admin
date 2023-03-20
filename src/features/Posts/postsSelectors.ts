import {AppRootStateType} from "app/store";

export const postsSelector = (state: AppRootStateType) => state.postsReducer.posts.items
export const postSelector = (state: AppRootStateType) => state.postsReducer.post

//meta data
export const postsTotalCountSelector = (state: AppRootStateType) => state.postsReducer.posts.totalCount

//query params
export const postsPageNumberSelector = (state: AppRootStateType) => state.postsReducer.queryParams.pageNumber

