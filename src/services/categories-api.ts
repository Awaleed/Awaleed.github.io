import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "./base-api";
import { Category, ConvertCategory } from "@/models/category";

export const CategoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseApiQuery("/1"),
  endpoints: (builder) => ({
    allCategories: builder.query<Category[], any>({
      query: () => ({ url: "/categories" }),

      transformResponse: (response: Category[]) => {
        return response.map((branch) => {
          return ConvertCategory.toCategory(JSON.stringify(branch));
        });
      },
    }),
  }),
});

export const { useAllCategoriesQuery } = CategoriesApi;
