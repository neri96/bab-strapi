import { api, transformation } from "./api";

export interface IMenu {
  id: number;
  title: string;
  dishes: any;
}

export const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query<{ content: IMenu[] }, void>({
      query: () => ({ url: "menu", params: { populate: "dishes" } }),
      transformResponse: (response) => transformation({ response }),

      providesTags: ["Menu"],
    }),
  }),
});

export const { useGetMenuQuery } = menuApi;
