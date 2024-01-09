import { useState } from "react";
import { addToCart, getCart } from "../utils/localStorage";

interface ICartProduct {
  id: number;
  data?: {
    image: string;
    title: string;
    department: string;
    price: string;
  };
  quantity: number;
}

const useLocalStorage = () => {
  const [value, setValue] = useState(getCart());

  const handleValue = ({ id, quantity = 1 }: ICartProduct) => {
    addToCart({ id, quantity });
    setValue(getCart());
  };

  return { value, handleValue };
};

export default useLocalStorage;
