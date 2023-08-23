import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "./base-api";

export interface BranchModel {
  id: number;
  name_ar: string;
  name_en: string;
  has_delivery: boolean;
  has_pickup_delivery: boolean;
  latitude: number;
  longitude: number;
}

export interface ValueWithIdModel {
  id: number;
  name: string;
  description?: string;
  photo?: string;
}

export const DataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: baseApiQuery(),
  endpoints: (builder) => ({
    allBranches: builder.query<BranchModel[], any>({
      query: () => ({ url: "branches" }),

      transformResponse: (response: BranchModel[]) => {
        return response.map((branch) => {
          return {
            ...branch,
            latitude: Number(branch.latitude),
            longitude: Number(branch.longitude),
          };
        });
      },
    }),
    allSlicingMethod: builder.query<ValueWithIdModel[], any>({
      query: () => ({ url: "slicing_method" }),
    }),
  }),
});

export const { useAllBranchesQuery, useAllSlicingMethodQuery } = DataApi;
