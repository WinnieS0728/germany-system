import api from "@/lib/api";
import { useEffect, useState } from "react";

export const useFetchApplyList = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await api.getBusinessApplyList({});

      setData(res);
    }
    fetchData();
  }, []);

  return data;
};
