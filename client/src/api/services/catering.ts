import { ICateringNew, IDish, ResponseMessage } from "../../ts/interfaces";
import { api } from "./api";

export const cateringApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCateringList: builder.query<IDish[], string | undefined>({
      query: (category) => {
        return {
          url: "catering/some",
          params: { category },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id: id }: IDish) => ({
                type: "Catering" as const,
                id,
              })),
              "Catering",
            ]
          : ["Catering"],
    }),
    addCateringDish: builder.mutation<ResponseMessage, ICateringNew>({
      query: (body) => {
        return {
          url: "catering/new",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Catering", "CateringCategory"],
    }),
    sendCateringRequest: builder.mutation<
      ResponseMessage,
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
          url: "catering/send",
          method: "POST",
          body: value,
        };
      },
    }),
  }),
});

export const {
  useGetCateringListQuery,
  useAddCateringDishMutation,
  useSendCateringRequestMutation,
} = cateringApi;
