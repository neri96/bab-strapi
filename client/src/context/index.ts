import { createContext } from "react";

export const ProductIdCtx = createContext(null);
export const CategoriesCtx = createContext([]);
export const CurretnCtgCtx = createContext(null);

export const GetItemsCtx = createContext<{ [key: string]: () => void }>({});
