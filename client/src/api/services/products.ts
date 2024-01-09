import { api, transformation } from "./api";

export interface IProduct {
  uid: string;
  id: number;
  title: string;
  amount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: any;
  modifiers: any;
  discount: number;
  inStock: boolean;
  isModifier: boolean;
  popularity: number;
  price: number;
}

export interface IModifier {
  _id: string;
  name: string;
}

export interface IContainer {
  _id: string;
  uid: string;
  createdAt?: string;
  updatedAt?: string;
  department: string;
  description: string;
  image: string;
  imageUrl: string;
  isContainer: boolean;
  name: string;
  modifiers?: IProduct[] | IModifier[];
}

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      {
        content: IProduct[];
        meta: {
          pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
          };
        };
      },
      {
        searchValue: string;
        department: string;
        pageSize: number;
        currentPage: number;
      }
    >({
      query: ({ searchValue, department, pageSize }) => {
        return {
          url: "products?populate=*&",
          params: {
            "filters[isModifier][$eq]": false,
            "filters[department][title]": department,
            "filters[title][$containsi]": searchValue,
            "pagination[page]": 1,
            "pagination[pageSize]": pageSize,
          },
        };
      },
      transformResponse: (response) =>
        transformation({ response, includeMeta: true }),
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query<{ content: IProduct }, string>({
      query: (id) => {
        return {
          url: `products/${id}`,
          params: {
            "populate[product][populate]": "department",
            populate: "image",
          },
        };
      },
      transformResponse: (response) =>
        transformation({ response, isArray: false }),
      providesTags: ["Product"],
    }),
    sendMessage: builder.query<
      { success: boolean },
      { name: string; email: string; phone: string; message: string }
    >({
      query: (value) => {
        return {
          url: `products/send`,
          method: "POST",
          body: value,
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useLazySendMessageQuery,
} = productsApi;
