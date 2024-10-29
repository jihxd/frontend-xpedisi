import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './features/layout/layout-slice'
import growthbookReducer from './features/growthbook/growthbook-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      layout: layoutReducer,
      growthbook: growthbookReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
