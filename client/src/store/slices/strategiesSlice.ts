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

// TODO: Move to a more generic loading state
export const initialState: IStrategiesState = {
  isLoading: true,
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
      state.isLoading = true
    },
    nullifyError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFactions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFactions.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.factions = payload.data.factions
      })
      .addCase(fetchFactions.rejected, (state) => {
        state.isLoading = false
      })

    builder
      .addCase(fetchMaps.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMaps.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.maps = payload.data.maps
      })
      .addCase(fetchMaps.rejected, (state) => {
        state.isLoading = false
      })

    builder
      .addCase(fetchCreateStrategy.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCreateStrategy.fulfilled, (state, { payload }) => {
        state.isLoading = false

        if (payload.error) {
          state.isLoading = false
          state.error = payload.error
          return
        }

        state.slug = payload.data.strategy.slug
      })
      .addCase(fetchCreateStrategy.rejected, (state, payload) => {
        state.error = payload.error?.message || 'something went wrong'
      })
  },
})

export const strategiesReducer = slice.reducer
export const { restore, nullifyError } = slice.actions
