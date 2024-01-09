import { RootState } from "../store";

import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { BaseQueryFn } from "@reduxjs/toolkit/query/react";

export const transformation = ({
  response,
  isArray = true,
  includeMeta = false,
}: any) => {
  const transFc = (elem: any) => {
    const { id, attributes } = elem;

    if (attributes.image && attributes.image?.data) {
      attributes.image = attributes.image.data.attributes.url;
    }

    return { id, ...attributes };
  };

  const content = isArray
    ? [...response.data].map(transFc)
    : transFc(response.data);

  const result: any = { content };

  if (includeMeta) result.meta = response.meta;

  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_URL}/api/`,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export const api = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Product",
    "Modifier",
    "Department",
    "Menu",
    "Settings",
    "Catering",
    "CateringCategory",
    "User",
    "Cart",
    "Notifs",
    "Order",
    "Reservation",
  ],
  endpoints: () => ({}),
});
