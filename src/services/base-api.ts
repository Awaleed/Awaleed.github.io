import { RootState } from "@/redux/store";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

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

// export const axiosBaseQuery =
//   (
//     { baseUrl, ...baseConfig }: { baseUrl?: string } & AxiosRequestConfig = {
//       baseUrl: "",
//     }
//   ): BaseQueryFn<
//     (AxiosRequestConfig & { url: string; token?: string }) | string,
//     unknown,
//     unknown
//   > =>
//   async (options, { getState }) => {
//     const configs =
//       typeof options === "string"
//         ? {
//             url: options,
//           }
//         : options;
//     const { token, ...config } = configs;

//     // /* An Idea to resolve Media update for laravel */
//     // if (configs.method && ['PUT', 'PATCH'].includes(configs.method)){
//     //     configs.method = 'POST';
//     //     if (configs.data) {
//     //         configs.data['_method'] = configs.method;
//     //     } else {
//     //         configs.data = {
//     //             _method: configs.method
//     //         };
//     //     }
//     // }

//     try {
//       const authAccessToken = (getState() as RootState).auth.token;
//       // const deviceName = (getState() as RootState).auth.deviceName;
//       // const locale = (getState() as RootState).page.locale;
//       const headers: any = {
//         "X-Requested-With": "XMLHttpRequest",
//         Accept: "application/json",
//         // "Accept-Language": locale,
//         "Access-Control-Allow-Origin": "*", //process.env.NEXT_PUBLIC_DASHBOARD_URL
//         // "Accept-Language": locale
//       };
//       if (token || authAccessToken) {
//         const accessToken = token || (authAccessToken ? authAccessToken : null); //decrypt
//         headers["Authorization"] = `Bearer ${authAccessToken}`;
//       }
//       // if (deviceName) {
//       //   headers["Device-Name"] = deviceName;
//       // }
//       const axiosInstance = axios.create({
//         baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${
//           baseUrl ? "/" + baseUrl : ""
//         }`,
//         headers,
//       });
//       const response = await axiosInstance({
//         ...baseConfig,
//         ...omit(config, ["token", "headers"]),
//         headers: {
//           ...baseConfig?.headers,
//           ...config?.headers,
//         },
//       });
//       return { data: response.data };
//       // return { data: response.data?.data || response.data }
//     } catch (axiosError) {
//       let err = axiosError as AxiosError<iApiResponse>;
//       if (err.response?.data) {
//         return {
//           error: err.response?.data,
//         };
//       }
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };
