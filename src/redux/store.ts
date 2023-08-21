import { Reducer, configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@/services/auth-api";
import authReducer, { AuthState } from "@/redux/slices/auth";
import counterReducer, { CounterState } from "@/redux/slices/counter";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import branchReducer, { BranchState } from "./slices/branch";
import { BrancApi } from "@/services/branch-api";

const persistConfig = {
  key: "root",
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
    [AuthApi.reducerPath]: AuthApi.reducer,
    [BrancApi.reducerPath]: BrancApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      AuthApi.middleware,
      BrancApi.middleware,
    ]),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
