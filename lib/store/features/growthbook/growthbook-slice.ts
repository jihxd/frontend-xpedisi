import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GrowthbookState {
  isInitialized: boolean
}

const initialState: GrowthbookState = {
  isInitialized: false,
}

export const growthbookSlice = createSlice({
  name: 'growthbook',
  initialState,
  reducers: {
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const { setIsInitialized } = growthbookSlice.actions

export default growthbookSlice.reducer
