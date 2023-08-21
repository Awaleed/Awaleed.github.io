import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "./base-api";

export interface BranchModel {
  id: number;
  name_ar: String;
  nameen: String;
  has_delivery: boolean;
  has_pickup_delivery: boolean;
  latitude: number;
  longitude: number;
}

export const BrancApi = createApi({
  reducerPath: "branchApi",
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
  }),
});

export const { useAllBranchesQuery } = BrancApi;
