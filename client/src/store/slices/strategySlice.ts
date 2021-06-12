import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICreateStrategyUnitDto } from '@cohdex/shared'
import { strategiesApi } from '../../api'
import { IStrategySliceState } from '../../types'

/*
 I am handling most of the state inside Strategy.tsx because tactical map syncs
 its own gameState and also triggers an event for React to update.

 ;;; Should refactor this to it's local component. *should*
*/

export const fetchStrategy = createAsyncThunk(
  'strategies/fetchStrategy',
  async (slug: string) => strategiesApi.getStrategy(slug)
)

export const addUnitToStrategy = createAsyncThunk(
  'strategies/addUnitToStrategy',
  async (data: ICreateStrategyUnitDto) => strategiesApi.addUnitToStrategy(data)
)

export const chooseSpawnpoint = createAsyncThunk(
  'strategies/chooseSpawnpoint',
  async ({
    strategyId,
    spawnpoint,
  }: {
    strategyId: number
    spawnpoint: number
  }) => strategiesApi.chooseSpawnpoint(strategyId, spawnpoint)
)

export const initialState: IStrategySliceState = {
  status: 'init',
  data: undefined!,
}

export const slice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    restore(state) {
      state.data = undefined!
      state.status = 'init'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategy.pending, (state) => {
        state.status = 'init'
      })
      .addCase(fetchStrategy.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.data = payload.data.strategy
      })
      .addCase(fetchStrategy.rejected, (state) => {
        state.status = 'idle'
      })

    builder
      .addCase(addUnitToStrategy.pending, (state) => {
        state.status = 'adding-unit'
      })
      .addCase(addUnitToStrategy.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        // handled in local component
      })
      .addCase(addUnitToStrategy.rejected, (state) => {
        state.status = 'idle'
      })

    builder
      .addCase(chooseSpawnpoint.pending, (state) => {
        state.status = 'updating-spawnpoint'
      })
      .addCase(chooseSpawnpoint.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        // handled in local component
      })
      .addCase(chooseSpawnpoint.rejected, (state) => {
        state.status = 'idle'
      })
  },
})

export const strategyReducer = slice.reducer
export const { restore } = slice.actions
