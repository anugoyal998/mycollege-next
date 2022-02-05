import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authState";

export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/refresh`, {
          withCredentials: true,
        });
        setAuth({ ...auth, user: data.user, isAuth: data.user ? true : false });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
};
