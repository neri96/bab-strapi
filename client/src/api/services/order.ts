import { api } from "./api";

import { IProduct } from "./products";
import { ICartData } from "./cart";

import { Order_Status } from "../../ts/types";

export interface ICheckoutItems {
  data: IProduct;
  quantity: number;
}

export interface IProductInOrder {
  department: string;
  id: string;
  image: string;
  imageUrl?: string;
  name: string;
  price: string;
}

export interface Item {
  product: IProductInOrder;
  quantity: number;
}

export interface IOrder {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  customer: string;
  date: string;
  items: Item[];
  orderNumber: string;
  paymentId: string;
  phone: string;
  status: Order_Status;
  totalPrice: number;
}

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      createOrder: builder.mutation<any, { items: ICartData[]; date: string }>({
        query: (body) => {
          return {
            url: "orders",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Order"],
      }),
      updateOrder: builder.mutation<
        { success: boolean; completed: boolean },
        string
      >({
        query: (sessionId) => {
          return {
            url: `orders/${sessionId}`,
            method: "PUT",
          };
        },
        invalidatesTags: ["Order"],
      }),
    };
  },
});

export const { useCreateOrderMutation, useUpdateOrderMutation } = orderApi;
