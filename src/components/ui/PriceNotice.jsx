import React from "react";

export default function PriceNotice({ text, price }) {
  return (
    <div className="bg-gray-100 p-5 flex flex-col items-center">
      <span>{text}</span>
      <span className="text-brand font-semibold text-xl">₩{price}</span>
    </div>
  );
}
