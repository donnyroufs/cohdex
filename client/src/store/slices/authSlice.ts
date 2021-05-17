import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api'
import { IAuthState } from '../../types'
import { RootState } from '../store'

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await authApi.me()

  return {
    data,
  }
})

// const userSelector = (state: RootState) => state.auth.user
// export const isAuthenticated = createSelector(userSelector, (user) => !!user)

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
