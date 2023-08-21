import { RootState } from "@/redux/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseApiQuery = (path = "/") =>
  fetchBaseQuery({
    baseUrl: "https://valley.project.orangefruits-sa.com/api" + path,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
