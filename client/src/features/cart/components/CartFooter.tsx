import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { useGetSettingsQuery } from "../../../api/services/settings";

import DatePicker from "../../../components/DatePicker";
import OrderDate from "./OrderDate";
import Checkout from "./Checkout";
import Loading from "../../../components/Loading";

import { IProduct } from "../../../api/services/products";
import { ICartData } from "../../../api/services/cart";

import "./CartFooter.scss";

const CartFooter = ({
  data,
  items,
  quantity,
}: {
  data: IProduct[];
  items: ICartData[];
  quantity: { [key in number]: number };
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [orderReadyDate, setOrderReadyDate] = useState("");

  const getTotal = () => {
    return data.reduce(
      (total: { price: number; discounted: number }, item: IProduct) => {
        const price = item.price * quantity[item.id];

        return {
          price: (total.price += price),
          discounted: item.discount
            ? total.price - total.price * (item.discount / 100)
            : 0,
        };
      },
      { price: 0, discounted: 0 }
    );
  };

  const settings = useGetSettingsQuery(undefined);

  if (settings.isLoading) return <Loading />;

  const { orders } = settings.data?.content || {};

  const { price, discounted } = getTotal();

  return (
    <>
      <div className="cart-footer">
        {orders ? (
          <div>
            <OrderDate
              orderReadyDate={orderReadyDate}
              handleDate={() => setDatePickerOpen(true)}
              clearDate={() => setOrderReadyDate("")}
            />

            <Checkout items={items} date={orderReadyDate} />
          </div>
        ) : (
          <h3 style={{ color: "#800000" }}>
            Orders are not available at the moment
          </h3>
        )}
        <div className="cart-footer__total">
          <h3>
            Total:
            {discounted ? (
              <>
                <span className="cart-footer__total--old">
                  ${price.toFixed(2)}
                </span>
                <span className="cart-footer__total--discounted">
                  ${discounted.toFixed(2)}
                </span>
              </>
            ) : (
              price.toFixed(2)
            )}
          </h3>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {datePickerOpen && (
          <DatePicker
            closeModal={() => setDatePickerOpen(false)}
            handleDate={(date) => setOrderReadyDate(date)}
            settings={{
              monthsAvailable: 5,
              dayInterval: 7,
              timeFrom: 10,
              timeMax: 22,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CartFooter;
