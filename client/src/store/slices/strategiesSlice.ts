import { ICreateStrategyRequestDto } from '@cohdex/shared'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { strategiesApi } from '../../api'
import { Identifier, IStrategiesState } from '../../types'
import { RootState } from '../store'

export const fetchFactions = createAsyncThunk(
  'strategies/fetchFactions',
  async () => {
    const { data } = await strategiesApi.getFactions()

    return {
      data,
    }
  }
)

export const fetchMaps = createAsyncThunk('strategies/fetchMaps', async () => {
  const { data } = await strategiesApi.getMaps()

  return {
    data,
  }
})

export const fetchCreateStrategy = createAsyncThunk(
  'strategies/fetchCreateStrategy',
  async (factionId: Identifier, { getState }) => {
    const { strategies } = getState() as RootState

    const { data, error } = await strategiesApi.createStrategy({
      alliesFactionId: +strategies.alliesFactionId!,
      axisFactionId: +strategies.axisFactionId!,
      factionId: +factionId!,
      mapId: +strategies.mapId!,
      title: strategies.title!,
    })

    return { data, error }
  }
)

// TODO: Move to a more generic loading state
export const initialState: IStrategiesState = {
  isLoading: true,
  factions: [],
  maps: [],
  title: '',
}

export const slice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    selectAxisFaction(state, action) {
      state.axisFactionId = action.payload
    },
    selectAlliesFaction(state, action) {
      state.alliesFactionId = action.payload
    },
    selectFaction(state, action) {
      state.factionId = action.payload
    },
    selectMap(state, action) {
      state.mapId = action.payload
    },
    setTitle(state, action) {
      state.title = action.payload
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
      })
      .addCase(fetchCreateStrategy.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})

export const strategiesReducer = slice.reducer
export const {
  selectAlliesFaction,
  selectAxisFaction,
  selectFaction,
  selectMap,
  setTitle,
} = slice.actions
