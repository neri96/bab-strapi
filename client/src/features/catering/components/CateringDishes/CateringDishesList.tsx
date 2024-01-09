import CateringDishesDetails from "./CateringDishesDetails";

import "./CateringDishesList.scss";

import { ICateringDish } from "../../../../api/services/catering";

const CateringDishesList = ({
  cateringDishes,
}: {
  cateringDishes: ICateringDish[];
}) => {
  return !cateringDishes.length ? (
    <div className="catering-dishes__empty">
      <h3>This section is currently empty</h3>
    </div>
  ) : (
    <div className="catering-dishes__body">
      {cateringDishes.map((dish: ICateringDish, i: number) => (
        <CateringDishesDetails key={dish.id} index={i} dish={dish} />
      ))}
    </div>
  );
};

export default CateringDishesList;
