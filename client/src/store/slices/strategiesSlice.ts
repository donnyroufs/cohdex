import { ICreateStrategyDto, IGetStrategyDto } from '@cohdex/shared'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { strategiesApi } from '../../api'
import { IStrategiesState } from '../../types'

export const fetchUserSrategies = createAsyncThunk(
  'strategies/fetchUserStrategies',
  async () => strategiesApi.getAllUserStrategies()
)

export const fetchFactions = createAsyncThunk(
  'strategies/fetchFactions',
  async () => strategiesApi.getFactions()
)

export const fetchMaps = createAsyncThunk('strategies/fetchMaps', async () =>
  strategiesApi.getMaps()
)

export const fetchStrategy = createAsyncThunk(
  'strategies/fetchStrategy',
  async (data: IGetStrategyDto) => strategiesApi.getStrategy(data)
)

export const fetchCreateStrategy = createAsyncThunk(
  'strategies/fetchCreateStrategy',
  async (payload: ICreateStrategyDto) =>
    strategiesApi.createStrategy(payload).then((res) => res)
)

export const initialState: IStrategiesState = {
  id: null,
  strategies: [],
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

        // TODO: Refactor
        // Adds results needed to redirect to new page
        // This does not belong here.
        state.slug = payload.data.strategy.slug
        state.id = payload.data.strategy.id
      })
      .addCase(fetchCreateStrategy.rejected, (state, payload) => {
        state.status = 'idle'
        state.error = payload.error?.message || 'something went wrong'
      })

    builder
      .addCase(fetchUserSrategies.pending, (state) => {
        state.status = 'loading-strategies'
      })
      .addCase(fetchUserSrategies.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.strategies = payload.data.strategies
      })
      .addCase(fetchUserSrategies.rejected, (state) => {
        state.status = 'idle'
      })
  },
})

export const strategiesReducer = slice.reducer
export const { restore, nullifyError } = slice.actions
