import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import cartSlice from "./slices/cartSlice";
import globalSlice from "./slices/globalSlice";
export const store = configureStore({
    reducer: {
        categorySlice,
        cartSlice,
        globalSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch