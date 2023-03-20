import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseType} from "features/Blogs/blogsApi";
import {AddUserType, apiUsers, UserType} from "features/Users/usersApi";

export const fetchUsersTC = createAsyncThunk('Users/fetchUsers', async (param, {dispatch, rejectWithValue}) => {
  try {
    const res = await apiUsers.getUsers()
    dispatch(setUsersAC({users: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const addUserTC = createAsyncThunk('Users/addUser', async (param: {user: AddUserType}, {dispatch, rejectWithValue}) => {
  try {
    const res = await apiUsers.addUser(param.user)
    dispatch(addUserAC({user: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const deleteUserTC = createAsyncThunk('Users/deleteUser', async (param: {userId: string}, {dispatch, rejectWithValue}) => {
  try {
    await apiUsers.deleteUser(param.userId)
    dispatch(deleteUserAC({userId: param.userId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})


const slice = createSlice({
  name: 'users',
  initialState: {
    users: {
      items: [] as UserType[]
    } as ResponseType<UserType[]>
  },
  reducers: {
    setUsersAC(state, action: PayloadAction<{ users: ResponseType<UserType[]> }>) {
      state.users = action.payload.users
    },
    addUserAC(state, action: PayloadAction<{ user: UserType }>) {
      state.users.items.unshift(action.payload.user)
    },
    deleteUserAC(state, action: PayloadAction<{ userId: string }>) {
      const index = state.users.items.findIndex(us => us.id === action.payload.userId)
      if (index > -1) {
        state.users.items.splice(index, 1)
      }
    }
  }
})

export const usersSlice = slice.reducer

export const {setUsersAC, addUserAC, deleteUserAC} = slice.actions