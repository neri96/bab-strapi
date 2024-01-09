import { api, transformation } from "./api";

import { IProduct } from "./products";

export interface ICartData {
  id: number;
  quantity: number;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCart: builder.query<
        { content: IProduct[] },
        { [key: string]: number }
      >({
        query: (params) => {
          return {
            url: "products",
            params: { ...params, populate: "image" },
          };
        },
        transformResponse: (response) => transformation({ response }),
        providesTags: ["Cart"],
      }),
    };
  },
});

export const { useGetCartQuery, useLazyGetCartQuery } = cartApi;
