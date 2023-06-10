import React from "react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteProduct, minusQuantity, plusQuantity } from "../api/firebase";

export default function ProductSideCard({
  product: { image, title, selected, price, quantity, id },
}) {
  return (
    <li className="flex">
      <div className="basis-1/6 rounded-md overflow-hidden">
        <img src={image} alt={title} />
      </div>
      <div className="basis-4/6 ml-4 flex flex-col justify-center gap-1">
        <h3>{title}</h3>
        <h3 className="font-semibold text-brand">{selected}</h3>
        <span className="text-sm">₩{price}</span>
      </div>
      <div className="basis-1/6 flex items-center gap-1">
        <AiOutlineMinusSquare
          className="hover:cursor-pointer"
          onClick={() => {
            minusQuantity(id);
          }}
        />
        <span>{quantity}</span>
        <AiOutlinePlusSquare
          className="hover:cursor-pointer"
          onClick={() => {
            plusQuantity(id);
          }}
        />
        <BsFillTrashFill
          className="hover:cursor-pointer"
          onClick={() => {
            deleteProduct(id);
          }}
        />
      </div>
    </li>
  );
}
