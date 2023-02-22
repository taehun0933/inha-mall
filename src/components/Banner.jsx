import React from "react";

export default function Banner() {
  return (
    <div className="w-full h-full">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          alt="banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold text-center">
          <h1>SHOPPY</h1>
          <h2 className="text-3xl font-medium mt-2">Best Q, Reasonable P</h2>
        </div>
      </div>
    </div>
  );
}
