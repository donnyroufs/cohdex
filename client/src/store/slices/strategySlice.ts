import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { strategiesApi } from '../../api'
import { IStrategySliceState } from '../../types'

export const fetchStrategy = createAsyncThunk(
  'strategies/fetchStrategy',
  async (slug: string) => strategiesApi.getStrategy(slug)
)

export const initialState: IStrategySliceState = {
  status: 'init',
  data: undefined!,
}

export const slice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategy.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.data = payload.data.strategy
      })
      .addCase(fetchStrategy.rejected, (state) => {
        state.status = 'idle'
      })
  },
})

export const strategyReducer = slice.reducer
export const actions = slice.actions
