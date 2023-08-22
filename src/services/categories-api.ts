import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApiQuery } from "./base-api";
import { Category, ConvertCategory, Product } from "@/models/category";

export const ProductsApi = createApi({
  reducerPath: "ProductsApi",
  baseQuery: baseApiQuery(),
  endpoints: (builder) => ({
    getProductByIdAndBranchId: builder.query<
      Product,
      { branchId: number; productId: number }
    >({
      query: ({ branchId, productId }) => ({
        url: `products/${productId}`,
        params: { branch_id: branchId },
      }),
      transformResponse: (response: Product) => {
        return ConvertCategory.toProduct(JSON.stringify(response));
      },
    }),
    allCategories: builder.query<Category[], number>({
      query: (branchId) => ({ url: `/${branchId}/categories` }),

      transformResponse: (response: Category[]) => {
        return response.map((branch) => {
          return ConvertCategory.toCategory(JSON.stringify(branch));
        });
      },
    }),
  }),
});

export const { useAllCategoriesQuery, useGetProductByIdAndBranchIdQuery } =
  ProductsApi;
