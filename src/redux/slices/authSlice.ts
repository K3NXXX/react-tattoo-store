import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from '../../types/auth.type'

type AuthInitialState ={
    userData: null | IUser
}
const initialState: AuthInitialState = {
    userData: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload
        }
    }
   
})
export const {setUserData} = authSlice.actions
export default authSlice.reducer