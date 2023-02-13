import React from "react";

export default function User({ user: { displayName, photoURL } }) {
  console.log(displayName, photoURL);
  return (
    <div className="flex items-center gap-2">
      <img
        src={photoURL}
        alt={displayName}
        referrerPolicy="no-referrer"
        className="w-10 h-10 rounded-full"
      />
      <span className="max-md:hidden">{displayName}</span>
    </div>
  );
}
