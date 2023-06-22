import { useEffect, useState } from "react";

export const TokenANDnoCia = () => {
  const [noCia, setNoCia] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const noCia = localStorage.getItem("NO_CIA");
    const token = localStorage.getItem("accessToken");
    setNoCia(noCia);
    setToken(token);
  }, []);

  return { noCia, token };
};
