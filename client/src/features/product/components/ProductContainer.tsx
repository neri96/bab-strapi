import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetOneProductQuery } from "../../../api/services/products";

import { BsInfoCircleFill } from "react-icons/bs";

import { AnimatePresence } from "framer-motion";

import DescrPopup from "../../../components/DescrPopup";
import ProductFooterCart from "./ProductFooterCart";
import ProductFooterDetails from "./ProductFooterDetails";

import Loading from "../../../components/Loading";

import "./ProductContainer.scss";

export const ProductContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentId = location.pathname.split("/")[2];
  const slug = location.pathname.split("/")[3];

  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [descrOpen, setDescrOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetOneProductQuery(currentId);

  useEffect(() => {
    if (data?.content) {
      const sluggedName = data.content.title.toLowerCase().replace(/\W+/g, "-");

      if (slug !== sluggedName) {
        return navigate(`/product/${currentId}/${sluggedName}`);
      }
    }
  }, [data, currentId, navigate, slug]);

  if (isLoading) return <Loading />;

  const { title, description, image, price, discount, inStock, amount } =
    data?.content || {};

  return data?.content ? (
    <>
      <div className="product">
        <div className="product__name--mobile">
          <h1>{title}</h1>
        </div>
        <div className="product__img">
          <div
            className="product__descr__icon--mobile"
            onClick={() => setDescrOpen(true)}
          >
            <BsInfoCircleFill size={35} color="#008000" />
          </div>
          {image ? <img src={image} alt={title} /> : null}
        </div>
        <div className="product__sidebar">
          <div className={`product__body ${!inStock ? "full" : ""}`}>
            <div className="product__name">
              <h1>{title}</h1>
            </div>
            <div className="product__descr">
              <p>{description}</p>
            </div>
          </div>
          {inStock ? (
            <div className="product__footer">
              <ProductFooterDetails
                amount={amount!}
                discount={discount}
                price={price}
                quantity={currentQuantity}
                setQuantity={setCurrentQuantity}
              />
              <ProductFooterCart id={+currentId} quantity={currentQuantity} />
            </div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {descrOpen && (
          <DescrPopup handleToggle={() => setDescrOpen((descr) => !descr)}>
            {description}
          </DescrPopup>
        )}
      </AnimatePresence>
    </>
  ) : (
    <h1>NOPE</h1>
  );
};
