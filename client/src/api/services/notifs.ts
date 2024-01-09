import { api, transformation } from "./api";

export const notifApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<
      {
        content: {
          isNotifOn: boolean;
          title: string;
          message: string;
          updatedAt: string;
        };
      },
      void
    >({
      query: () => {
        return {
          url: `notification`,
        };
      },
      transformResponse: (response) =>
        transformation({ response, isArray: false }),
      providesTags: ["Notifs"],
    }),
  }),
});

export const { useGetNotificationQuery } = notifApi;
