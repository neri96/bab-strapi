import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { BsFillCartPlusFill } from "react-icons/bs";

import Button from "../../../components/Button";
import ModifierList from "../components/ModifierList";

import useCartData from "../../../hooks/useCartData";

import * as storage from "../../../utils/localStorage";

import "./ProductDetails.scss";

import { IProduct } from "../../../api/services/products";

const ProductDetails = (
  {
    product,
    productId,
  }: {
    product: IProduct;
    productId: number;
  },
  ref: any
) => {
  const navigate = useNavigate();

  const { uid, title, modifiers, image } = product;

  const { modifyCartData } = useCartData();

  const [listOpen, setListOpen] = useState<boolean>(false);

  const handleList = () => setListOpen(!listOpen);

  return (
    <>
      <motion.div
        ref={ref}
        key={uid}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="product-details"
      >
        <div className="product-details__body">
          <div className="product-details__img">
            {image ? <img src={image} alt={title} /> : null}
          </div>
        </div>
        <div className="product-details__footer">
          <div className="product-details__name">
            <h3>{title}</h3>
          </div>
          <div className="product-details__order-btn">
            {modifiers.data.length ? (
              <Button handleClick={handleList}>View</Button>
            ) : (
              <>
                <Button
                  disabled={false}
                  handleClick={() => {
                    modifyCartData(() => {
                      return !!storage.getItem(productId)
                        ? undefined
                        : storage.addToCart({
                            id: productId,
                            quantity: 1,
                          });
                    });
                  }}
                >
                  <BsFillCartPlusFill size={20} />
                </Button>
                <Button
                  handleClick={() =>
                    navigate(
                      `/product/${productId}/${title
                        .toLowerCase()
                        .replace(/\W+/g, "-")}`
                    )
                  }
                >
                  Details
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {listOpen && (
          <ModifierList productId={productId} handleList={handleList} />
        )}
      </AnimatePresence>
    </>
  );
};

export default forwardRef(ProductDetails);
