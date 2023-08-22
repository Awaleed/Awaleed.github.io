"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import createCache from "@emotion/cache";

import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin]
});


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
      <CacheProvider value={ cacheRtl }>
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}
