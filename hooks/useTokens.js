import axios from "axios";
import { setCookies } from "cookies-next";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function useTokens() {
  try {
    var at = getCookie("access_token");
    var rt = getCookie("refresh_token");
    if (!rt) {
      return { access_token: null, refresh_token: null, user: null };
    }

    if (!at) {
      const rsp = await axios.post("/api/refresh/token", { refresh_token: rt });
      setCookies("access_token", rsp?.data?.data?.access_token, { maxAge: 3600 });
      at = rsp?.data?.data?.access_token;
    }
    const x =
      "c43b56488e74e6097c4e4171b6baa131e86f3d9ef47fb257c3a032d39c6aa50b";
    var user;
    jwt.verify(at, x, (err, info) => {
      // console.log(err)
      if (err) {
        return { access_token: null, refresh_token: null, user: null };
      }
      user = info;
    });
    return { access_token: at, refresh_token: rt, user };
  } catch (error) {
    console.log(error);
    return { access_token: null, refresh_token: null, user: null };
  }
}
