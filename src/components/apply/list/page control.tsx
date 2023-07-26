import { useEffect, useMemo, useState } from "react";

export const usePageControl = (data: any[], numberInOnePage: number) => {
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(data.length / numberInOnePage);

  const [prevBtnEnable, setPrevBtnEnable] = useState(true);
  const [nextBtnEnable, setNextBtnEnable] = useState(true);
  const buttonStatus = { prev: prevBtnEnable, next: nextBtnEnable };

  useEffect(() => {
    if (page === totalPage) {
      setNextBtnEnable(false);
    } else {
      setNextBtnEnable(true);
    }
    if (page === 1) {
      setPrevBtnEnable(false);
    } else {
      setPrevBtnEnable(true);
    }
    if (totalPage === 0) {
      setPrevBtnEnable(false);
      setNextBtnEnable(false);
    }
  }, [page, totalPage]);

  function nextPage() {
    if (!nextBtnEnable) {
      console.log("cant next");
      return;
    }
    setPage((prev) => prev + 1);
  }
  function prevPage() {
    if (!prevBtnEnable) {
      console.log("cant prev");
      return;
    }
    setPage((prev) => prev - 1);
  }
  const dataInThisPage = useMemo(() => {
    const startIndex = (page - 1) * numberInOnePage;
    const endIndex = startIndex + numberInOnePage;
    return data.slice(startIndex, endIndex);
  }, [page, data, numberInOnePage]);

  return { dataInThisPage, nextPage, prevPage, buttonStatus };
};
