import { useMemo } from "react";

import isEmpty from "lodash.isempty";

import { useGetCartQuery } from "../../../api/services/cart";

import CartDetails from "./CartDetails";
import CartFooter from "./CartFooter";

import Loading from "../../../components/Loading";

import { IProduct } from "../../../api/services/products";
import { ICartData } from "../../../api/services/cart";

import "./CartList.scss";

interface IParams {
  [key: string]: number;
}

const prepareParams = (items: ICartData[]) => {
  const params = items.reduce((result: IParams, item: ICartData, i: number) => {
    return { ...result, [`filters[id][$in][${i}]`]: item.id };
  }, {});

  return params;
};

const CartList = ({
  cartData,
}: {
  cartData: { items: ICartData[]; expiresAt: string };
}) => {
  const cartParams = prepareParams(cartData.items);

  const { data, isLoading } = useGetCartQuery(cartParams, {
    skip: isEmpty(cartParams),
  });

  const quantity = useMemo(() => {
    const result: { [key in number]: number } = {};

    cartData.items.forEach((item: ICartData) => {
      result[item.id] = item.quantity;
    });

    return result;
  }, [cartData.items]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="cart__list">
        {data?.content.map((product: IProduct) => {
          return (
            <CartDetails
              key={product.id}
              product={product}
              quantity={quantity[product.id]}
            />
          );
        })}
      </div>

      {data?.content ? (
        <CartFooter
          data={data?.content}
          items={cartData.items}
          quantity={quantity}
        />
      ) : null}
    </>
  );
};

export default CartList;
