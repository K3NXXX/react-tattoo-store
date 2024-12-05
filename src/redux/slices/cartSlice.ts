import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartTotalPrice } from "../../utils/getCartTotalPrice";
import { getItemsFromLS } from "../../utils/getItemsFromLS";
export type CartItemType = {
  id: number;
  image: string;
  name: string;
  price: number;
  count: number;
};
type CartInitialState = {
  items: CartItemType[];
  totalPrice: number;
  successData: boolean;
};
const initialState: CartInitialState = {
  items: getItemsFromLS(),
  totalPrice: getCartTotalPrice(),
  successData: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
   
    },

    minusItems(state, action) {

    },
    
    removeItems(state, action) {
      const removedItem = state.items.find((obj) => obj.id === action.payload);
      if (removedItem) {
        state.totalPrice -= removedItem.price * removedItem.count;
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
    },
    setSuccessData(state, action) {
      state.successData = action.payload;
    },
  },
});
export const { addItems, removeItems, minusItems, setSuccessData } =
  cartSlice.actions;
export default cartSlice.reducer;
