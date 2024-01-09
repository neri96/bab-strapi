import Button from "../../../components/Button";

import useCartData from "../../../hooks/useCartData";

import * as storage from "../../../utils/localStorage";

import "./ProductFooterCart.scss";

const ProductFooterCart = ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) => {
  const { modifyCartData } = useCartData();

  const handleClick = () => {
    modifyCartData(() => {
      storage.addToCart({
        id,
        quantity,
      });
    });
  };

  return (
    <div className="product__footer__cart">
      <Button
        animScale={false}
        additionalStyle={{ ...btnStyle }}
        handleClick={handleClick}
        disabled={false}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductFooterCart;

const btnStyle = {
  height: "60%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0",
};
