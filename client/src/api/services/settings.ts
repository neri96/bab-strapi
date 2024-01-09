import { api, transformation } from "./api";

export const settingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<
      { content: { id: number; orders: boolean; reservations: boolean } },
      void
    >({
      query: () => {
        return {
          url: `settings`,
          params: { "fields[0]": "orders", "fields[1]": "reservations" },
        };
      },
      transformResponse: (response) =>
        transformation({ response, isArray: false }),
      providesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;
