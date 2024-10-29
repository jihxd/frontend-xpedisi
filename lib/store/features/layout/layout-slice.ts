import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LayoutState {
  isExpanded: boolean
}

const initialState: LayoutState = {
  isExpanded: true,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload
    },
  },
})

export const { setIsExpanded } = layoutSlice.actions

export default layoutSlice.reducer
