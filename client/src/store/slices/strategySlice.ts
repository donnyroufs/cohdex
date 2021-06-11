import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICreateStrategyUnitDto } from '@cohdex/shared'
import { strategiesApi } from '../../api'
import { IStrategySliceState } from '../../types'

export const fetchStrategy = createAsyncThunk(
  'strategies/fetchStrategy',
  async (slug: string) => strategiesApi.getStrategy(slug)
)

export const addUnitToStrategy = createAsyncThunk(
  'strategies/addUnitToStrategy',
  async (data: ICreateStrategyUnitDto) => strategiesApi.addUnitToStrategy(data)
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

    builder
      .addCase(addUnitToStrategy.pending, (state) => {
        state.status = 'adding-unit'
      })
      .addCase(addUnitToStrategy.fulfilled, (state, { payload }) => {
        state.status = 'idle'

        // state.data.StrategyUnits = state.data.StrategyUnits.map((unit) =>
        //   unit.id === payload.data.localId
        //     ? { ...unit, id: payload.data.strategyUnit.id, commands: [] }
        //     : unit
        // )
      })
      .addCase(addUnitToStrategy.rejected, (state) => {
        state.status = 'idle'
      })
  },
})

export const strategyReducer = slice.reducer
export const actions = slice.actions
