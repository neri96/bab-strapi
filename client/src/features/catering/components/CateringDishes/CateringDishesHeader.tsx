import Hamburger from "../../../../components/Hamburger";

import useRollDown from "../../../../hooks/useRollDown";

import "./CateringDishesHeader.scss";

import { ICateringCtg } from "../../../../api/services/cateringCtg";

interface Props {
  categories: ICateringCtg[];
  currentCategory: number;
  handleCurrentCtg: (ctg: number) => void;
}

const nonPcWidth = window.innerWidth <= 1200;

const CateringDishesHeader = ({
  categories,
  currentCategory,
  handleCurrentCtg,
}: Props) => {
  const { ref, isOpen, handleState: handleList } = useRollDown();

  return (
    <div className="catering-dishes__header">
      <div className="catering-dishes__header__icon">
        <Hamburger dark={false} isOpen={isOpen} handleClick={handleList} />
      </div>
      <div
        ref={ref}
        className="catering-dishes__header__list"
        style={
          nonPcWidth
            ? { maxHeight: isOpen ? categories.length * 50 + "px" : "0" }
            : undefined
        }
      >
        {categories.map((category: ICateringCtg) => {
          return (
            <div
              key={category.id}
              className="catering-dishes__category"
              onClick={() => {
                handleCurrentCtg(category.id);
                nonPcWidth && handleList();
              }}
            >
              <h3>
                {category.title}
                <span
                  style={{
                    width: currentCategory === category.id ? "100%" : "",
                  }}
                />
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CateringDishesHeader;
