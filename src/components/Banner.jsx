import React from "react";

export default function Banner() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative my-3">
      <div className="relative">
        <img
          src="https://img.insight.co.kr/static/2022/07/17/700/img_20220717142917_q6n2cebn.webp"
          alt="banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-semibold text-center">
          <h1>인하몰 X 비얼디드키드</h1>
          <h2 className="text-3xl mt-2">당신으로 인하여.</h2>
        </div>
      </div>
    </div>
  );
}
