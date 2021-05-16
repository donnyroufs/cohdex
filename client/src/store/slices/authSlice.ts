import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api'
import { IAuthState } from '../../types'

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await authApi.me()

  return {
    data,
  }
})

export const initialState: IAuthState = {
  isLoading: true,
  user: null,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMe.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchMe.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.user = payload.data.user
    })

    builder.addCase(fetchMe.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const authReducer = slice.reducer
export const actions = slice.actions
