import { BranchModel } from "@/services/branch-api";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BranchState {
  value: any| null;
}

const initialState: BranchState = {
  value: null,
};

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranch: (state, action: PayloadAction<any | null>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBranch } = branchSlice.actions;

export default branchSlice.reducer;
