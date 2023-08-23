import { Price, Product } from "@/models/category";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product?: Product;
  slicingMethod?: any; // ValueWithIdModel? ,
  productPrice?: Price | null;
  options?: { key: number; value: number[] }[]; // Map<int, List<int>> ,
  quantity?: number;
  uuid?: string;
}

export interface CartState {
  cartItems?: CartItem[];
  iteration?: number;
  paymentMethod?: any; // PaymentMethodModel?;
  coupon?: any; // CouponModel?;
  note?: string;
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
  },
});

// Action creators are generated for each case reducer function
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
