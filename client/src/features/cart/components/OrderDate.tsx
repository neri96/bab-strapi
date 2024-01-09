import Button from "../../../components/Button";

import IcRemove from "../../../assets/icons/remove.svg";

import "./OrderDate.scss";

const OrderDate = ({
  orderReadyDate,
  handleDate,
  clearDate,
}: {
  orderReadyDate: string;
  handleDate: () => void;
  clearDate: () => void;
}) => {
  return (
    <div className="order-date">
      <Button handleClick={handleDate}>
        {orderReadyDate ? "Edit Date" : "Pick a Date"}
      </Button>
      {orderReadyDate ? (
        <>
          <div className="order-date__date">
            <h4>{orderReadyDate}</h4>
          </div>
          <div className="order-date__remove" onClick={clearDate}>
            <img src={IcRemove} alt="" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default OrderDate;
