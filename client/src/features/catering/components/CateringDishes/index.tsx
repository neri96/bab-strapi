import { useEffect, useState } from "react";

import CateringDishesHeader from "./CateringDishesHeader";
import CateringDishesList from "./CateringDishesList";

import Loading from "../../../../components/Loading";

import { useGetCategoriesQuery } from "../../../../api/services/cateringCtg";
import { useGetCateringListQuery } from "../../../../api/services/catering";

const CateringDishes = () => {
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  const cateringCtg = useGetCategoriesQuery(undefined);
  const cateringDishes = useGetCateringListQuery(currentCategory, {
    skip: !currentCategory,
  });

  useEffect(() => {
    if (cateringCtg.data?.content) {
      setCurrentCategory(cateringCtg.data?.content[0]?.id);
    }
  }, [cateringCtg]);

  const handleCurrentCtg = (ctg: number) => {
    setCurrentCategory(ctg);
  };

  if (cateringDishes.isLoading) {
    return <Loading />;
  }

  return (
    <>
      {cateringDishes.data && cateringCtg.data ? (
        <>
          <CateringDishesHeader
            categories={cateringCtg.data.content}
            currentCategory={currentCategory!}
            handleCurrentCtg={handleCurrentCtg}
          />
          <CateringDishesList cateringDishes={cateringDishes.data.content} />
        </>
      ) : null}
    </>
  );
};

export default CateringDishes;
