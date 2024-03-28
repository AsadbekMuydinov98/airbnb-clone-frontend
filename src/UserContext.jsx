import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";
import Cookies from "js-cookie";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({children}) {
  const [kuki, setKuki] = useState("");
  useEffect(() => {
    const cookie = Cookies.get("token");
    if (cookie) {
      setKuki(cookie);
    }
  }, []);
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get('/user/profile', {
        headers: {
          authorization: `${kuki}`}
        }).then((data) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}
