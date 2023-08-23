import { Reducer, configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@/services/auth-api";
import authReducer, { AuthState } from "@/redux/slices/auth";
import counterReducer, { CounterState } from "@/redux/slices/counter";
import cartReducer from "@/redux/slices/cart";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import branchReducer, { BranchState } from "./slices/branch";
import showLoginReducer from "./slices/showLogin";
import { DataApi } from "@/services/data-api";
import { ProductsApi } from "@/services/categories-api";

const persistConfig = {
  key: "root2",
  storage,
};

function persist<T>(reducer: Reducer): Reducer<T> {
  return persistReducer(persistConfig, reducer);
}

export const store = configureStore({
  reducer: {
    counter: persist<CounterState>(counterReducer),
    auth: persist<AuthState>(authReducer),
    branch: persist<BranchState>(branchReducer),
    showLogin: showLoginReducer,
    cart: cartReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [DataApi.reducerPath]: DataApi.reducer,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      AuthApi.middleware,
      DataApi.middleware,
      ProductsApi.middleware,
    ]),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
