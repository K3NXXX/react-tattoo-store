import { createSlice } from "@reduxjs/toolkit"


type GlobalInitialState = {
	isAuthFormOpened: boolean
}
  
const initialState: GlobalInitialState = {
	isAuthFormOpened: false

}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsAuthFormOpened(state, action) {
			state.isAuthFormOpened = action.payload
		}
    }
})
export const {setIsAuthFormOpened} = globalSlice.actions
export default globalSlice.reducer