import { ComponentType } from "react";

import useCartData from "../../../hooks/useCartData";

import { Operator } from "../../../ts/types";
import { CartQuantityProps } from "../ts/interfaces";

import * as storage from "../../../utils/localStorage";

const withInstantQtyUpdate = <T,>(
  Component: ComponentType<T | CartQuantityProps>
) => {
  return ({
    productId,
    quantity,
    amount,
  }: {
    productId: number;
    amount: number;
    quantity: number;
  }) => {
    const { modifyCartData } = useCartData();

    const handleQuantity = (operator: Operator) => {
      if (amount > quantity) {
        modifyCartData(() => {
          storage.updateQuantity({
            id: productId,
            operator,
          });
        });
      }
    };

    return (
      <Component
        quantity={quantity}
        handleQuantity={handleQuantity}
        reachedLimit={amount <= quantity}
      />
    );
  };
};
export default withInstantQtyUpdate;
