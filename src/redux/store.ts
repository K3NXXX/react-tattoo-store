import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'
import categorySlice from './slices/categorySlice'
import favorites from './slices/favoriteSlice'
import globalSlice from './slices/globalSlice'

export const store = configureStore({
	reducer: {
		categorySlice,
		cartSlice,
		favorites,
		globalSlice,
		authSlice,
	},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
