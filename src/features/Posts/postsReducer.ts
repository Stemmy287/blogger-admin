import {AddOrEditPostType, AddPostType, apiPosts, PostType} from "./postsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchPostsTC = createAsyncThunk('Posts/fetchPosts', async (param, {dispatch, rejectWithValue}) => {
  try {
    const res = await apiPosts.getPosts()
    dispatch(setPostsAC({posts: res.items}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const fetchPostTC = createAsyncThunk('Posts/fetchPost', async (param: {postId: string}, {dispatch, rejectWithValue}) => {
  try {
    const res = await apiPosts.getPost(param.postId)
    dispatch(setPostAC({post: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const addPostTC = createAsyncThunk('Posts/addPost', async (param: {data: AddOrEditPostType}, {dispatch, rejectWithValue}) => {
  try {
    const res = await apiPosts.addPost(param.data)
    dispatch(addPostAC({data: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const editPostTC = createAsyncThunk('Posts/editPost', async (param: {postId: string, data: AddOrEditPostType}, {dispatch, rejectWithValue}) => {
  try {
    await apiPosts.editPost(param.postId, param.data)
    dispatch(editPostAC({postId: param.postId, data: param.data}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const deletePostTC = createAsyncThunk('Posts/deletePost', async (param: {postId: string}, {dispatch, rejectWithValue}) => {
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
    post: {} as PostType,
    posts: [] as Array<PostType>
  },
  reducers: {
    setPostsAC(state, action: PayloadAction<{ posts: Array<PostType> }>) {
      state.posts = action.payload.posts
    },
    setPostAC(state, action: PayloadAction<{ post: PostType }>) {
      state.post = action.payload.post
    },
    addPostAC(state, action: PayloadAction<{ data: AddPostType }>) {
      state.posts.unshift({
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
      const index = state.posts.findIndex(ps => ps.id === action.payload.postId)
      if (index > -1 ) {
        state.posts[index] = {...state.posts[index], ...action.payload.data}
      }
    },
    deletePostAC(state, action: PayloadAction<{ postId: string }>) {
      const index = state.posts.findIndex(ps => ps.id === action.payload.postId)
      if (index > -1 ) {
        state.posts.splice(index, 1)
      }
    }
  }
})

export const postsReducer = slice.reducer
const {setPostsAC, setPostAC, addPostAC, editPostAC, deletePostAC} = slice.actions