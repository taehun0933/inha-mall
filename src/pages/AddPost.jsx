import React, { useEffect, useState } from "react";
import { getProductsData, getUserUid, writePost } from "../api/firebase";
import { useUserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const { data, isLoading, error } = useQuery(["products"], getProductsData);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setSelected(Object.values(data)[0].title);
      setImageUrl(Object.values(data)[0].image);
    }
  }, [data]);

  const { user } = useUserContext();
  const handleBtnClick = (res) => {
    if (res === false) return;

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 작성해 주세요!");
      return;
    }

    const time = getCurrentTime();

    const photoURL = user.photoURL;
    const displayName = user.displayName;
    const writedUserUid = getUserUid();
    writePost({
      title,
      content,
      time,
      photoURL,
      displayName,
      imageUrl,
      writedUserUid,
    }).then(() => {
      alert("성공적으로 등록되었습니다!");
      navigate("/community");
    });
  };
  const getCurrentTime = () => {
    let today = new Date();
    return today.toLocaleString();
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState();
  const [imageUrl, setImageUrl] = useState();

  if (isLoading) return <>로딩중...</>;
  if (error) return <>{error}</>;

  return (
    <div className="flex flex-col items-center gap-3 mt-4 h-full">
      <h1 className="text-2xl font-bold">새로운 게시글 등록</h1>
      <form className="px-12 w-full h-full flex gap-4">
        <div className="relative top-20">
          <label htmlFor="products-choice" className="mr-2 text-brand">
            제품 선택
          </label>
          <select
            id="products-choice"
            className="border-gray-300 border outline-none rounded-md"
            onChange={(e) => {
              setSelected(e.target.value);
              const selectElement = document.getElementById("products-choice");
              const selectedOptionId =
                selectElement.options[selectElement.selectedIndex].id;
              setImageUrl(selectedOptionId);
            }}
          >
            {data &&
              Object.values(data).map((product) => {
                return (
                  <option value={product.title} id={product.image}>
                    {product.title}
                  </option>
                );
              })}
          </select>
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="w-96 relative top-2 rounded-lg"
            ></img>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            className="w-full px-4 pt-5 pb-3 border-gray-300 border-b outline-none text-2xl"
            required
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            className="w-full border-gray-300 border mt-4 outline-none p-2"
            required
            style={{
              height: "530px",
              resize: "none",
            }}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="flex justify-end">
            <button
              className="py-2 px-4 border rounded-lg bg-brand text-white"
              onClick={(e) => {
                e.preventDefault();
                const res = window.confirm("정말로 등록하시겠습니까?");
                handleBtnClick(res);
              }}
            >
              등록하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
