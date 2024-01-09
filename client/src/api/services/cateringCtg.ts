import { api, transformation } from "./api";

export interface ICateringCtg {
  id: number;
  title: string;
}

export const cateringCtgApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ content: ICateringCtg[] }, void>({
      query: () => ({ url: "catering-categories" }),
      transformResponse: (response) => transformation({ response }),

      providesTags: ["CateringCategory"],
    }),
  }),
});

export const { useGetCategoriesQuery } = cateringCtgApi;
