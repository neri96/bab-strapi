import PageLayout from "../layout/PageLayout";

import { ProductContainer } from "../features/products";

const Market = () => {
  return (
    <PageLayout
      title="Market"
      description="Here you can observe products and dishes from all over Eastern Europe"
      narrow={true}
    >
      <ProductContainer />
    </PageLayout>
  );
};

export default Market;
