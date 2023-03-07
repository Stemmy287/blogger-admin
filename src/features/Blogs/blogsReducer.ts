import {AddOrEditBlogType, apiBlogs, BlogType} from "features/Blogs/blogsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchBlogsTC = createAsyncThunk('Blogs/fetchBlogs', async (param, {dispatch ,rejectWithValue}) => {
    try {
        const res = await apiBlogs.getBlogs()
        dispatch(setBlogsAC({blogs: res.items}))
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const fetchBlogTC = createAsyncThunk('Blogs/fetchBlog', async (param: {blogId: string}, {dispatch ,rejectWithValue}) => {
    try {
        const res = await apiBlogs.getBlog(param.blogId)
        dispatch(setBlogAC({blog: res}))
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const addBlogTC = createAsyncThunk('Blogs/addBlog', async (param: {data: AddOrEditBlogType}, {dispatch ,rejectWithValue}) => {
    try {
        const res = await apiBlogs.addBlog(param.data)
        dispatch(addBlogAC({blog: res}))
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const editBlogTC = createAsyncThunk('Blogs/editBlog', async (param: {blogId: string ,data: AddOrEditBlogType}, {dispatch ,rejectWithValue}) => {
    try {
        await apiBlogs.editBlog(param.blogId, param.data)
        dispatch(editBlogAC({blogId: param.blogId, data: param.data}))
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const deleteBlogTC = createAsyncThunk('Blogs/deleteBlog', async (param: {blogId: string}, {dispatch ,rejectWithValue}) => {
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
        blog: {} as BlogType,
        blogs: [] as Array<BlogType>
    },
    reducers: {
        setBlogsAC(state, action: PayloadAction<{blogs: Array<BlogType>}>) {
            state.blogs = action.payload.blogs
        },
        setBlogAC(state, action: PayloadAction<{blog: BlogType}>) {
            state.blog = action.payload.blog
        },
        addBlogAC(state, action: PayloadAction<{blog: BlogType}>) {
            state.blogs.unshift(action.payload.blog)
        },
        editBlogAC(state, action: PayloadAction<{blogId: string, data: AddOrEditBlogType}>) {
            const index = state.blogs.findIndex(bg => bg.id === action.payload.blogId)
            if (index > -1) {
                state.blogs[index] = {...state.blogs[index], ...action.payload.data}
            }
        },
        deleteBlogAC(state, action: PayloadAction<{blogId: string}>) {
            const index = state.blogs.findIndex(bg => bg.id === action.payload.blogId)
            if (index > -1) {
                state.blogs.splice(index, 1)
            }
        }
    }
})

export const blogsReducer = slice.reducer
export const {setBlogsAC, setBlogAC, addBlogAC, editBlogAC, deleteBlogAC} = slice.actions

