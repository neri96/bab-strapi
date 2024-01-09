import { Dispatch, SetStateAction } from "react";

import CartQuantity from "../../../components/CartQuantity";
import withDelayedQtyUpdate from "../../../components/CartQuantity/hoc/withDelayedQtyUpdate";

import "./ProductFooterDetails.scss";

const ProductFooterDetails = ({
  amount,
  discount,
  price,
  quantity,
  setQuantity,
}: {
  amount: number;
  discount: number | undefined;
  price: number | undefined;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const CartQuantityDelayed = withDelayedQtyUpdate(CartQuantity);

  const priceQty = quantity * price!;

  return (
    <div className="product-footer__details">
      <CartQuantityDelayed
        quantity={quantity}
        setQuantity={setQuantity}
        amount={amount}
      />
      <div className="product-footer__price">
        {discount ? (
          <>
            <h3>Price:</h3>
            <div className="product-footer__discount">
              <h3>${priceQty.toFixed(2)}</h3>
              <div className="product-footer__discount--crossed">
                <span />
                <span />
              </div>
            </div>
            <h3 className="product-footer__price--highlighted">
              ${(priceQty - priceQty * (discount / 100)).toFixed(2)}
            </h3>
          </>
        ) : (
          <h3>Price: {priceQty.toFixed(2)}$</h3>
        )}
      </div>
    </div>
  );
};

export default ProductFooterDetails;
