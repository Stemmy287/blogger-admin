import {AddOrEditBlogType, apiBlogs, BlogType, ResponseType} from "features/Blogs/blogsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "app/store";

export const fetchBlogsTC = createAsyncThunk('Blogs/fetchBlogs', async (param, {
  dispatch,
  rejectWithValue,
  getState
}) => {

  const state = getState() as AppRootStateType
  const queryParams = state.blogsReducer.queryParams

  try {
    const res = await apiBlogs.getBlogs(queryParams)
    dispatch(setBlogsAC({blogs: res}))
  } catch (e) {
    return rejectWithValue(null)
  } finally {
    dispatch(setIsPaginationBlogsAC({isPagination: false}))
  }
})
export const fetchBlogTC = createAsyncThunk('Blogs/fetchBlog', async (param: { blogId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiBlogs.getBlog(param.blogId)
    dispatch(setBlogAC({blog: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const addBlogTC = createAsyncThunk('Blogs/addBlog', async (param: { data: AddOrEditBlogType }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiBlogs.addBlog(param.data)
    dispatch(addBlogAC({blog: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const editBlogTC = createAsyncThunk('Blogs/editBlog', async (param: { blogId: string, data: AddOrEditBlogType }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiBlogs.editBlog(param.blogId, param.data)
    dispatch(editBlogAC({blogId: param.blogId, data: param.data}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const deleteBlogTC = createAsyncThunk('Blogs/deleteBlog', async (param: { blogId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiBlogs.deleteBlog(param.blogId)
    dispatch(deleteBlogAC({blogId: param.blogId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: {
      items: [] as BlogType[]
    } as ResponseType<BlogType[]>,
    blog: {} as BlogType,
    queryParams: {
      pageNumber: 1,
      pageSize: 15
    },
    isPagination: false
  },

  reducers: {
    setBlogsAC(state, action: PayloadAction<{ blogs: ResponseType<BlogType[]> }>) {
      if (state.isPagination) {
        state.blogs = {...action.payload.blogs, items: [...state.blogs.items, ...action.payload.blogs.items]}
      } else {
        state.blogs = action.payload.blogs
      }
    },
    setPageNumberBlogsAC(state, action: PayloadAction<{ pageNumber: number }>) {
      state.queryParams.pageNumber = action.payload.pageNumber
    },
    setIsPaginationBlogsAC(state, action: PayloadAction<{ isPagination: boolean }>) {
      state.isPagination = action.payload.isPagination
    },
    setBlogAC(state, action: PayloadAction<{ blog: BlogType }>) {
      state.blog = action.payload.blog
    },
    addBlogAC(state, action: PayloadAction<{ blog: BlogType }>) {
      state.blogs.items.unshift(action.payload.blog)
    },
    editBlogAC(state, action: PayloadAction<{ blogId: string, data: AddOrEditBlogType }>) {
      const index = state.blogs.items.findIndex(bg => bg.id === action.payload.blogId)
      if (index > -1) {
        state.blogs.items[index] = {...state.blogs.items[index], ...action.payload.data}
      }
    },
    deleteBlogAC(state, action: PayloadAction<{ blogId: string }>) {
      const index = state.blogs.items.findIndex(bg => bg.id === action.payload.blogId)
      if (index > -1) {
        state.blogs.items.splice(index, 1)
      }
    }
  }
})

export const blogsSlice = slice.reducer
export const {
  setBlogsAC,
  setPageNumberBlogsAC,
  setIsPaginationBlogsAC,
  setBlogAC,
  addBlogAC,
  editBlogAC,
  deleteBlogAC
} = slice.actions

