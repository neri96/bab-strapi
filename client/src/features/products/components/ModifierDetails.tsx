import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { BsFillCartPlusFill } from "react-icons/bs";

import Button from "../../../components/Button";

import useCartData from "../../../hooks/useCartData";

import * as storage from "../../../utils/localStorage";

import "./ModifierDetails.scss";

import { IProduct } from "../../../api/services/products";

const ModifierDetails = ({
  id,
  modifier,
}: {
  id: number;
  modifier: IProduct;
}) => {
  const navigate = useNavigate();

  const { uid, title, image } = modifier;

  const { modifyCartData } = useCartData();

  return (
    <>
      <motion.div
        key={uid}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="modifier-details"
      >
        <div className="modifier-details__body">
          <div className="modifier-details__img">
            {image ? <img src={image} alt={title} /> : null}
          </div>
        </div>
        <div className="modifier-details__footer">
          <div className="modifier-details__name">
            <h3>{title}</h3>
          </div>
          <div className="modifier-details__order-btn">
            <Button
              disabled={!!storage.getItem(id)}
              // disabled={!!storage.getItem(id)}
              handleClick={() => {
                modifyCartData(() => {
                  return !!storage.getItem(id)
                    ? undefined
                    : storage.addToCart({
                        id,
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
                  `/product/${id}/${title.toLowerCase().replace(/\W+/g, "-")}`
                )
              }
            >
              Details
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ModifierDetails;
