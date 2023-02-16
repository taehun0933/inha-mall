import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorageUser } from "../api/localStorageUser";

export default function Protected({ children, checkAdmin }) {
  const user = getLocalStorageUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/", { replace: true });

    if (checkAdmin && (!user || !user.isAdmin)) {
      navigate("/", { replace: true });
    }
  }, [navigate, user, checkAdmin]);
  return children;
}
