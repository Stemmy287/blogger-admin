import {AppRootStateType} from "app/store";

export const usersSelector = (state: AppRootStateType) => state.usersReducer.users.items

//meta data
export const usersTotalCountSelector = (state: AppRootStateType) => state.usersReducer.users.totalCount