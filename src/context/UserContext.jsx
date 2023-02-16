import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { checkUserIsLoggedIn, login, logout } from "../api/firebase";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    checkUserIsLoggedIn((user) => {
      setUser(user);
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
