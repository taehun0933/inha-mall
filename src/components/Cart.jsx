import { HiShoppingCart } from "react-icons/hi";
import React from "react";
import { useEffect } from "react";
import { checkCartProducts } from "../api/firebase";
import { useState } from "react";

export default function Cart() {
  const [productAmount, setProductAmount] = useState();
  useEffect(() => {
    checkCartProducts((products) => {
      setProductAmount(products && products.length);
    });
  }, []);
  return (
    <div className="relative">
      {productAmount && (
        <div className="bg-red-500 rounded-full w-5 h-5 absolute -right-1.5 -top-1.5 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{productAmount}</span>
        </div>
      )}
      <HiShoppingCart className="text-3xl" />
    </div>
  );
}
