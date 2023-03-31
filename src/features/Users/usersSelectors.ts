import {AppRootStateType} from "app/store";

export const usersSelector = (state: AppRootStateType) => state.usersReducer.users.items

//query params
export const usersPageSelector = (state: AppRootStateType) => state.usersReducer.queryParams.pageNumber
export const usersPageSizeSelector = (state: AppRootStateType) => state.usersReducer.queryParams.pageSize

//meta data
export const usersTotalCountSelector = (state: AppRootStateType) => state.usersReducer.users.totalCount