import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { getPostsData } from "../api/firebase";
import { useQuery } from "react-query";

export default function Community() {
  const { data, isLoading, error } = useQuery(["posts"], getPostsData);
  const [postDatas, setPostDatas] = useState();

  useEffect(() => {
    if (data) {
      setPostDatas(
        Object.values(data).sort(function (a, b) {
          var timeA = a.time.toUpperCase();
          var timeB = b.time.toUpperCase();
          if (timeA > timeB) {
            return -1;
          }
          if (timeA < timeB) {
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
    <>
      <header className="w-full flex justify-end p-4">
        <Link to="/community/addPost" className="flex items-center gap-1">
          후기 작성
          <AiOutlinePlus />
        </Link>
      </header>
      {Object.values(data).length === 0 ? (
        <div className="font-semibold">
          후기가 없습니다. 첫 번째 후기를 작성해 주세요!
        </div>
      ) : (
        <ul className="flex flex-col gap-4 my-2 px-4">
          {postDatas &&
            postDatas.map((postData) => {
              return (
                <Post
                  content={postData.content}
                  displayName={postData.displayName}
                  imageUrl={postData.imageUrl}
                  photoURL={postData.photoURL}
                  time={postData.time}
                  title={postData.title}
                  writedUserUid={postData.writedUserUid}
                  uuid={postData.uuid}
                />
              );
            })}
        </ul>
      )}
    </>
  );
}
