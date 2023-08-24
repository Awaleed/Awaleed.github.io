import { Price, Product } from "@/models/category";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product?: Product;
  slicingMethod?: any; // ValueWithIdModel? ,
  productPrice?: Price | null;
  options?: { key: number; value: number[] }[]; // Map<int, List<int>> ,
  quantity?: number;
  readonly uuid?: string;
}

export interface CartState {
  cartItems?: CartItem[];
  iteration?: number;
  paymentMethod?: any; // PaymentMethodModel?;
  coupon?: any; // CouponModel?;
  note?: string | null;
  deliveryAddressType?: any; // DeliveryAddressType?;
}

const initialState: CartState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState | null>) => {
      state = { ...state, ...action.payload };
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems?.filter(
        (item) => item.uuid !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.iteration = 0;
      state.paymentMethod = null;
      state.coupon = null;
      state.note = null;
      state.deliveryAddressType = null;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = [...(state.cartItems ?? []), action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, addToCart, clearCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
