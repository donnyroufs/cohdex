import { ICreateStrategyRequestDto } from '@cohdex/shared'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { strategiesApi } from '../../api'
import { IStrategiesState } from '../../types'

export const fetchFactions = createAsyncThunk(
  'strategies/fetchFactions',
  async () => strategiesApi.getFactions()
)

export const fetchMaps = createAsyncThunk('strategies/fetchMaps', async () =>
  strategiesApi.getMaps()
)

export const fetchCreateStrategy = createAsyncThunk(
  'strategies/fetchCreateStrategy',
  async (payload: ICreateStrategyRequestDto) =>
    strategiesApi.createStrategy(payload).then((res) => res)
)

export const initialState: IStrategiesState = {
  status: 'init',
  slug: null,
  factions: [],
  maps: [],
  error: null,
}

export const slice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    restore(state) {
      state.slug = null
      state.error = null
      state.status = 'idle'
    },
    nullifyError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFactions.pending, (state) => {})
      .addCase(fetchFactions.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.factions = payload.data.factions
      })
      .addCase(fetchFactions.rejected, (state) => {
        state.status = 'idle'
      })

    builder
      .addCase(fetchMaps.pending, (state) => {})
      .addCase(fetchMaps.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.maps = payload.data.maps
      })
      .addCase(fetchMaps.rejected, (state) => {
        state.status = 'idle'
      })

    builder
      .addCase(fetchCreateStrategy.pending, (state) => {
        state.status = 'create-strategy'
      })
      .addCase(fetchCreateStrategy.fulfilled, (state, { payload }) => {
        state.status = 'idle'

        if (payload.error) {
          state.error = payload.error
          return
        }

        state.slug = payload.data.strategy.slug
      })
      .addCase(fetchCreateStrategy.rejected, (state, payload) => {
        state.status = 'idle'
        state.error = payload.error?.message || 'something went wrong'
      })
  },
})

export const strategiesReducer = slice.reducer
export const { restore, nullifyError } = slice.actions
