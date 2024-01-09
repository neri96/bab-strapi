import { api, transformation } from "./api";

export interface ICateringDish {
  id: number;
  name: string;
  image: string;
  description: string;
}

export const cateringApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCateringList: builder.query<{ content: ICateringDish[] }, number>({
      query: (id) => {
        return {
          url: "caterings",
          params: { "filters[catering_category][id]": id, populate: "image" },
        };
      },
      transformResponse: (response) => transformation({ response }),
      providesTags: ["Catering"],
    }),
    sendCateringRequest: builder.mutation<
      string,
      {
        name: string;
        email: string;
        phone: string;
        location: string;
        guests: number;
        date: string;
        message: string;
      }
    >({
      query: (value) => {
        return {
          url: "caterings/send",
          method: "POST",
          body: value,
        };
      },
    }),
  }),
});

export const { useGetCateringListQuery, useSendCateringRequestMutation } =
  cateringApi;
