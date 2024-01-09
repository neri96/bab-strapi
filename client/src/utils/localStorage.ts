import { Operator } from "../ts/types";

interface ICartItem {
  id: number;
  quantity: number;
}

interface ICartData {
  expiresAt: Date;
  items: ICartItem[];
}

const setCartData = (cartData: ICartData) => {
  const now = new Date();

  cartData.expiresAt = new Date(now.setDate(now.getDate() + 7));
  window.localStorage.setItem("cart", JSON.stringify(cartData));
};

export const getCart = () => {
  const cart = window.localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : null;
};

export const getItem = (id: number) => {
  const cart = window.localStorage.getItem("cart");

  return cart
    ? JSON.parse(cart).items.find((item: ICartItem) => +item.id === id)
    : null;
};
export const addToCart = (input: ICartItem) => {
  const cart = window.localStorage.getItem("cart");
  let cartData;

  const { id, quantity } = input;

  if (cart) {
    cartData = JSON.parse(cart);

    const product = cartData.items.find((product: ICartItem) => {
      return +product.id === +id;
    });

    if (product) {
      Object.assign(product, { quantity: quantity + product.quantity });
    } else {
      cartData.items.push(input);
    }
  } else {
    cartData = [input];
  }

  setCartData(cartData);
};
export const updateQuantity = ({
  id,
  operator,
}: {
  id: number;
  operator: Operator;
}) => {
  const cart = window.localStorage.getItem("cart");
  const cartData = cart ? JSON.parse(cart) : null;

  if (cartData)
    cartData.items.forEach((product: ICartItem) => {
      if (id === product.id) {
        if (operator === Operator.Add) {
          product.quantity += 1;
        } else {
          product.quantity -= 1;
        }
      }
    });

  setCartData(cartData);
};

export const deleteProduct = (productId: number) => {
  const cart = window.localStorage.getItem("cart");
  let cartData = cart ? JSON.parse(cart) : null;

  if (cartData)
    cartData.items = cartData.items.filter(({ id }: ICartItem) => {
      return +id !== productId;
    });

  if (cartData.items.length) {
    setCartData(cartData);
  } else {
    window.localStorage.removeItem("cart");
  }
};
export const clearCart = () => {
  window.localStorage.removeItem("cart");
};

export const getNotifConfig = () => {
  const notif = window.localStorage.getItem("notif");

  return notif ? JSON.parse(notif) : null;
};

export const setNotifLimit = (updatedAt: string) => {
  const notifData = { isActive: false, updatedAt };

  window.localStorage.setItem("notif", JSON.stringify(notifData));
};

export const notifLimitRemove = () => {
  window.localStorage.removeItem("notif");
};
