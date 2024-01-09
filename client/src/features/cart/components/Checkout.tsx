import { useCreateOrderMutation } from "../../../api/services/order";

import Button from "../../../components/Button";

import { ICartData } from "../../../api/services/cart";

const Checkout = ({ items, date }: { items: ICartData[]; date: string }) => {
  const [mutate] = useCreateOrderMutation();

  const handleCheckout = async () => {
    const response: any = await mutate({ items, date });

    if (response.data?.session.url)
      window.location.href = response.data?.session.url;
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button handleClick={handleCheckout} disabled={!date}>
        Checkout
      </Button>
    </div>
  );
};

export default Checkout;
