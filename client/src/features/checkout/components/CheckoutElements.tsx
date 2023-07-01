import { useMemo } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";

import * as storage from "../../../utils/localStorage";

import CheckoutForm from "./CheckoutForm";

const key =
  "pk_test_51MrcYFE1d4cWhDjFbT0iO1vdF6QnF8sPoZ6yQaFpPcid4bKeuUQvQyerVtSbMiX8UdB7EvFdXH13a23cTrm1NjFy00DGTQQQFc";

const stripeTestPromise = loadStripe(key);

const CheckoutElements = () => {
  const total = useMemo(() => {
    return storage
      .getCart()
      .items.reduce((total: number, { data: { price }, quantity }: any) => {
        return (total += +price * quantity);
      }, 0);
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "3px",
      borderRadius: "5px",
    },
  };

  const options: StripeElementsOptions = {
    mode: "payment",
    payment_method_types: ["card"],
    capture_method: "manual",
    amount: +(total * 100).toFixed(),
    currency: "usd",
    appearance,
  };

  return (
    <Elements options={options} stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutElements;
