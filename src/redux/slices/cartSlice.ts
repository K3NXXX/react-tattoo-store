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
    addItems(state, action: PayloadAction<{ id: string; count?: number }>) {
      //@ts-ignore
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      const countToAdd = action.payload.count || 1;

      if (findItem) {
        findItem.count += countToAdd;
      } else {
        const newItem = { ...action.payload, count: countToAdd };
        //@ts-ignore
        state.items.push(newItem);
      }

      state.totalPrice = state.items.reduce(
        (sum: number, obj) => obj.price * obj.count + sum,
        0,
      );
    },

    minusItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count > 0) {
          findItem.count--;
          state.totalPrice -= findItem.price;
        }
      }
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
