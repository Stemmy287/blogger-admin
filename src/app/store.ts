import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {blogsSlice} from "features/Blogs/blogsSlice";
import {postsSlice} from "features/Posts/postsSlice";
import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "features/Users/usersSlice";

const rootReducers = combineReducers({
    blogsReducer: blogsSlice,
    postsReducer: postsSlice,
    usersReducer: usersSlice
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

//types
export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

// @ts-ignore
window.store = store;