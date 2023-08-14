import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Flip, toast } from "react-toastify";

export const AA = () => {
  const [data, setData] = useState<object>();

  const loadingBox = toast.loading("loading");

  setTimeout(() => {
    toast.update(loadingBox, {
      type: "success",
      render: "ok",
      isLoading: false,
      transition: Flip,
      autoClose: 3000,
      closeOnClick: true,
      closeButton: true,
    });
  }, 5000);

  const apiPromise = useMemo(() => {
    return axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/todos/1",
    });
  }, []);

  useEffect(() => {
    async function getData() {
      const b = await toast.promise(apiPromise, {
        pending: "is pending",
        success: "is success",
        error: "is reject",
      });

      setData(b.data);
    }
    getData();
  }, [apiPromise]);

  return <h1>{(data as dataType)?.title}</h1>;
};

type dataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
