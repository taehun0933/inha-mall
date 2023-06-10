import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { checkCartProducts } from "../api/firebase";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import ProductSideCard from "../components/ProductSideCard";
import Button from "../components/ui/Button";
import PriceNotice from "../components/ui/PriceNotice";

export default function MyCart() {
  const [products, setProducts] = useState();
  useEffect(() => {
    checkCartProducts((products) => {
      setProducts(products);
    });
  }, []);

  let totalProductPrice = 0;
  if (products)
    for (let i = 0; i < products.length; i++)
      totalProductPrice += products[i].price * products[i].quantity;
  const baesongbi = 3000;

  return (
    <section className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold border-b w-full text-center border-gray-300 pt-4 pb-2">
        내 장바구니
      </h1>
      {products && (
        <ul className="w-full p-6 flex flex-col gap-3">
          {products.map((product) => (
            <ProductSideCard key={product.id} product={product} />
          ))}
        </ul>
      )}
      <div className="flex justify-around w-full items-center border-t border-gray-300 py-6">
        <PriceNotice text={"상품 총액"} price={totalProductPrice} />
        <AiFillPlusCircle />
        <PriceNotice text={"배송액"} price={baesongbi} />
        <FaEquals />
        <PriceNotice text={"총가격"} price={totalProductPrice + baesongbi} />
      </div>
      <Button text={"주문하기"} cssOptions={"w-full"} />
    </section>
  );
}
