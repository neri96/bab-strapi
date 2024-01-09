import { useState, useRef, useCallback } from "react";

import { useGetProductsQuery } from "../../../api/services/products";

import ProductDetails from "./ProductDetails";

import "./ProductList.scss";

import { IProduct } from "../../../api/services/products";

const ProductList = ({
  searchValue,
  department,
}: {
  searchValue: string;
  department: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetProductsQuery({
    searchValue: searchValue.length >= 3 ? searchValue : "",
    department,
    pageSize: currentPage * 3,
    currentPage,
  });

  const { total, pageCount } = data?.meta.pagination || {};

  const observer = useRef<IntersectionObserver | null>();

  const lastItem = useCallback(
    (product: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && total !== pageCount) {
          setCurrentPage((page) => page + 1);
        }
      });

      if (product) observer.current.observe(product);
    },
    [isLoading, total !== pageCount]
  );

  return (
    <div className="product-list">
      {data?.content.map((product: IProduct, i: number, self: IProduct[]) => {
        return i === self.length - 1 ? (
          <ProductDetails
            ref={lastItem}
            key={product.id}
            productId={product.id}
            product={product}
          />
        ) : (
          <ProductDetails
            key={product.id}
            productId={product.id}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
