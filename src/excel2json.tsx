import { useCallback, useEffect, useState } from "react";
import * as xlsx from "xlsx";

export const useExcel2Json = (excelFile: File[]): result => {
  const [data, setData] = useState<data[]>([]);
  const [json, setJson] = useState<json[]>([]);
  const [isHeadSame, setIsHeadSame] = useState<boolean>(true);

  const dataProcess = useCallback((data: xlsxData[]) => {
    const head = Object.values(data[0]);
    const body = data.slice(1).map((data) => Object.values(data));
    const finalData: data[] = [
      {
        head,
        body,
      },
    ];
    const json: Record<string, cellType>[] = body.map((cell) => {
      const obj: Record<string, cellType> = {};
      for (const i in cell) {
        obj[head[i]] = cell[i];
      }
      return obj;
    });
    setData((prev) => prev.concat(finalData));
    setJson((prev) => prev.concat(json));
  }, []);

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const excel = e.target?.result;
        const workbook = xlsx.read(excel, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = xlsx.utils.sheet_to_json(worksheet) as xlsxData[];
        dataProcess(data);
      };
    },
    [dataProcess]
  );

  useEffect(() => {
    if (!excelFile.length) {
      return;
    }
    for (const file of excelFile) {
      readFile(file);
    }
  }, [excelFile, readFile]);

  useEffect(() => {
    if (data.length > 1) {
      const firstHead = data[0]?.head.join(",");
      setIsHeadSame(
        data
          .slice(1)
          .map((i) => i?.head.join(","))
          .every((i2) => i2 === firstHead)
      );
    }
  }, [data]);

  function dataFormat(data: data[]): data {
    const head = data[0].head;
    const body = data.map((i) => i.body).reduce((a, b) => a.concat(b), []);
    return {
      head,
      body,
    };
  }

  if (data.length === 0) {
    return "no data";
  } else if (!isHeadSame) {
    return "head different";
  }
  return { data: dataFormat(data), json: json };
};

export type cellType = string | number;

type head = cellType[];
type body = cellType[][];

type data = {
  head: head;
  body: body;
};
type json = Record<string, cellType>;

export type result =
  | {
      data: data;
      json: json[];
    }
  | string;

type xlsxData = Record<string, cellType>;