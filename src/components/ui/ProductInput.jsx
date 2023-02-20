import React from "react";

export default function ProductInput({ number, placeholder, onChange, value }) {
  return (
    <input
      type={number ? "number" : "text"}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="w-full px-4 py-5 border-gray-300 border my-1"
      required
    />
  );
}
