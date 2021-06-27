import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { authReducer } from './slices/authSlice'
import { strategiesReducer } from './slices/strategiesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    strategies: strategiesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
