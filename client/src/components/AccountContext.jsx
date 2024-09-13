import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AccountContext = createContext();
export default function UserContext({ children }) {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/auth/login", {
      credentials: "include",
    })
      .catch((err) => {
        //server is down
        setUser({ loggedIn: false });
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          //some thing wrong with server
          setUser({ loggedIn: false });
          return;
        }
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        navigate("/home");
        setUser({ ...data });
      });
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
}
