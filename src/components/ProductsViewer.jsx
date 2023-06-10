import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProductsData } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function ProductsViewer() {
  const { data, isLoading, error } = useQuery(["products"], getProductsData);
  const [sortedProductsDatas, setSortedProductsDatas] = useState();

  useEffect(() => {
    if (data) {
      setSortedProductsDatas(
        Object.values(data).sort(function (a, b) {
          var titleA = a.title.toUpperCase();
          var titleB = b.title.toUpperCase();
          if (titleA > titleB) {
            return -1;
          }
          if (titleA < titleB) {
            return 1;
          }
          return 0;
        })
      );
    }
  }, [data]);

  if (isLoading) return <>로딩중...</>;
  if (error) return <>{error}</>;

  return (
    <ul className="grid grid-cols-3 gap-4 my-2 px-4">
      {sortedProductsDatas &&
        sortedProductsDatas.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </ul>
  );
}
