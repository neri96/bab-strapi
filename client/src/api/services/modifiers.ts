import { api, transformation } from "./api";

import { IProduct } from "./products";

export const modifiersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getModifiers: builder.query<{ content: IProduct[] }, { id: number }>({
      query: ({ id }) => {
        return {
          url: `products`,
          params: { "filters[parentProduct][id]": id, populate: "image" },
        };
      },
      transformResponse: (response) => transformation({ response }),
      providesTags: ["Modifier"],
    }),
  }),
});

export const { useGetModifiersQuery } = modifiersApi;
