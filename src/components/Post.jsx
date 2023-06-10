import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deletePost, getUserUid } from "../api/firebase";

export default function Post({
  content,
  displayName,
  imageUrl,
  photoURL,
  time,
  title,
  writedUserUid,
  uuid,
}) {
  const handleDelBtnClick = (res) => {
    if (res === false) return;

    const userUid = getUserUid();
    const check = checkUserSelf(userUid);
    if (check === false) {
      alert("본인이 작성한 게시물이 아닙니다!");
      return;
    }

    // 삭제 처리
    deletePost(uuid);
    alert("성공적으로 삭제되었습니다!");
  };
  const checkUserSelf = (userUid) => {
    return userUid === writedUserUid;
  };
  return (
    <li className="w-full h-96 rounded-lg bg-slate-400 flex overflow-hidden px-2">
      <img src={imageUrl} alt={imageUrl} className="w-1/4 mt-auto mb-auto" />
      <div className="flex flex-col w-full p-4 relative">
        <div className="flex items-center justify-between border-b border-white pb-4">
          <div className="flex items-center gap-2 font-medium">
            <img
              src={photoURL}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{displayName}</span>
          </div>
          <div className="text-sm">{time}</div>
        </div>
        <h1 className="text-black text-2xl font-normal my-4">{title}</h1>
        <pre className="overflow-y-auto h-48">{content}</pre>
        <div
          className="absolute bottom-3 right-3 flex items-center"
          onClick={() => {
            const res = window.confirm("정말로 삭제하시겠습니까?");
            handleDelBtnClick(res);
          }}
        >
          <AiFillDelete className="transition-all hover:scale-110 cursor-pointer text-xl" />
        </div>
      </div>
    </li>
  );
}
