import { useEffect, useMemo, useState } from "react";

export const usePageControl = <T,>(data: T[], numberInOnePage: number) => {
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
      return;
    }
    setPage((prev) => prev + 1);
  }
  function prevPage() {
    if (!prevBtnEnable) {
      return;
    }
    setPage((prev) => prev - 1);
  }
  function gotoPage(page = 1) {
    if (page > totalPage) {
      setPage(totalPage);
    } else {
      setPage(page);
    }
  }

  const dataInThisPage: T[] = useMemo(() => {
    const startIndex = (page - 1) * numberInOnePage;
    const endIndex = startIndex + numberInOnePage;
    return data.slice(startIndex, endIndex);
  }, [page, numberInOnePage, data]);

  return { dataInThisPage, nextPage, prevPage, buttonStatus, gotoPage };
};
