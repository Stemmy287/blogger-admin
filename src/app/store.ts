import {AnyAction, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {blogsReducer} from "features/Blogs/blogsReducer";
import {postsReducer} from "features/Posts/postsReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducers = combineReducers({
    blogs: blogsReducer,
    posts: postsReducer
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