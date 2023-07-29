import { useEffect, useState } from "react";
import { API_Services } from "../Config/APIService";

const useFetch = (setDatas) => {
  const [errorE, setErrorE] = useState("");
  const noCia = localStorage.getItem("NO_CIA");
  const token = localStorage.getItem("accessToken");

  let path = "PROYECTO/Select";

  //   useEffect(() => {
  const getData = async () => {
    try {
      const response = await fetch(`${API_Services}/${path}/${noCia}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      setDatas(data);
    } catch (error) {
      setErrorE(error);
    }
  };
  // }, [noCia, path, token ]);

  return { getData };
};

export default useFetch;


