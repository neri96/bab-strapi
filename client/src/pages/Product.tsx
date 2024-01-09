import { useLocation } from "react-router-dom";

import PageLayout from "../layout/PageLayout";

import { ProductContainer } from "../features/product";

const Product = () => {
  const location = useLocation();

  const pathname = location.pathname.split("/");

  const titleRaw = pathname[pathname.length - 1].replace(/-/g, " ");

  const title = titleRaw
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return (
    <PageLayout title={title} fixedHeight={true} style={{ minHeight: "600px" }}>
      <ProductContainer />
    </PageLayout>
  );
};

export default Product;
