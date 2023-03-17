import {AddOrEditPostType, AddPostType, apiPosts, PostType} from "./postsApi";
import {ResponseType} from "features/Blogs/blogsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "app/store";

export const fetchPostsTC = createAsyncThunk('Posts/fetchPosts', async (param, {
  dispatch,
  rejectWithValue,
  getState
}) => {

  const state = getState() as AppRootStateType
  const queryParams = state.posts.queryParams

  try {
    const res = await apiPosts.getPosts(queryParams)
    dispatch(setPostsAC({posts: res}))
  } catch (e) {
    return rejectWithValue(null)
  } finally {
    dispatch(setIsPaginationPostsAC({isPagination: false}))
  }
})
export const fetchPostTC = createAsyncThunk('Posts/fetchPost', async (param: { postId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiPosts.getPost(param.postId)
    dispatch(setPostAC({post: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const addPostTC = createAsyncThunk('Posts/addPost', async (param: { data: AddOrEditPostType }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiPosts.addPost(param.data)
    dispatch(addPostAC({data: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const editPostTC = createAsyncThunk('Posts/editPost', async (param: { postId: string, data: AddOrEditPostType }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiPosts.editPost(param.postId, param.data)
    dispatch(editPostAC({postId: param.postId, data: param.data}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const deletePostTC = createAsyncThunk('Posts/deletePost', async (param: { postId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiPosts.deletePost(param.postId)
    dispatch(deletePostAC({postId: param.postId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      items: [] as PostType[]
    } as ResponseType<PostType[]>,
    post: {} as PostType,
    queryParams: {
      pageNumber: 1,
      pageSize: 15
    },
    isPagination: false
  },
  reducers: {
    setPostsAC(state, action: PayloadAction<{ posts: ResponseType<PostType[]> }>) {
      if (state.isPagination) {
        state.posts = {...action.payload.posts, items: [...state.posts.items, ...action.payload.posts.items]}
      } else {
        state.posts = action.payload.posts
      }
    },
    setPageNumberPostsAC(state, action: PayloadAction<{ pageNumber: number }>) {
      state.queryParams.pageNumber = action.payload.pageNumber
    },
    setIsPaginationPostsAC(state, action: PayloadAction<{ isPagination: boolean }>) {
      state.isPagination = action.payload.isPagination
    },
    setPostAC(state, action: PayloadAction<{ post: PostType }>) {
      state.post = action.payload.post
    },
    addPostAC(state, action: PayloadAction<{ data: AddPostType }>) {
      state.posts.items.unshift({
        ...action.payload.data, extendedLikesInfo:
          {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: 'None',
            newestLikes: []
          }
      })
    },
    editPostAC(state, action: PayloadAction<{ postId: string, data: AddOrEditPostType }>) {
      const index = state.posts.items.findIndex(ps => ps.id === action.payload.postId)
      if (index > -1) {
        state.posts.items[index] = {...state.posts.items[index], ...action.payload.data}
      }
    },
    deletePostAC(state, action: PayloadAction<{ postId: string }>) {
      const index = state.posts.items.findIndex(ps => ps.id === action.payload.postId)
      if (index > -1) {
        state.posts.items.splice(index, 1)
      }
    }
  }
})

export const postsReducer = slice.reducer
export const {
  setPostsAC,
  setPageNumberPostsAC,
  setIsPaginationPostsAC,
  setPostAC,
  addPostAC,
  editPostAC,
  deletePostAC
} = slice.actions