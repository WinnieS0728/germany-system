import api from "@/api";
import { useAppSelector } from "@data/store";
import excel from "@img/files/excel_icon.svg";
import word from "@img/files/word_icon.svg";
import ppt from "@img/files/ppt_icon.svg";
import pdf from "@img/files/pdf_icon.svg";
import img from "@img/files/img_icon.svg";
import normal from "@img/files/file_icon.svg";
import { useCallback } from "react";

type fileType = "word" | "ppt" | "excel" | "pdf" | "img" | "normal";
type mimeObj = {
  id: fileType;
  type: Record<string, string>;
};
const mimeObj: mimeObj[] = [
  {
    id: "word",
    type: {
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  },
  {
    id: "ppt",
    type: {
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
  },
  {
    id: "excel",
    type: {
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      numbers: "application/x-iwork-numbers-sffnumbers",
    },
  },
  {
    id: "pdf",
    type: {
      pdf: "application/pdf",
    },
  },
  {
    id: "img",
    type: {
      jpg: "image/jpeg",
      png: "image/png",
    },
  },
];

export const useFiles = () => {
  const fileData = useAppSelector((state) => state.files).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const { nowOrder } = useAppSelector((state) => state.formInfo).body;

  async function uploadFile(id: string) {
    for (const file of fileData.newFile) {
      const filePackage = new FormData();
      filePackage.append("formId", id);
      filePackage.append("EmpId", nowUser.EmpId);
      filePackage.append("fileName", file.name);
      filePackage.append("webName", "BusinessTrip");
      filePackage.append("SIGNORDER", nowOrder.toString());
      filePackage.append("file", file);
      api.uploadFileSign(filePackage);
    }
  }

  const getFileSize = useCallback((num: number): string => {
    if (num <= 1000) {
      return `${num} Byte`;
    } else if (num <= 1000 * 1000) {
      return `${(num / 1024).toFixed(1)} KB`;
    } else {
      return `${(num / 1024 / 1024).toFixed(1)} MB`;
    }
  }, [])

  const getFileType = useCallback((fileType: string): {
    type: fileType;
    src: string;
  } => {
    const target = mimeObj.find((i) =>
      Object.values(i.type).some((mime) => mime === fileType)
    );

    let imgSrc;
    switch (target?.id) {
      case "img":
        imgSrc = img;
        break;
      case "word":
        imgSrc = word;
        break;
      case "ppt":
        imgSrc = ppt;
        break;
      case "excel":
        imgSrc = excel;
        break;
      case "pdf":
        imgSrc = pdf;
        break;
      case "normal":
        imgSrc = normal;
        break;
      default:
        imgSrc = normal;
        break;
    }
    return { type: target?.id || "normal", src: imgSrc };
  }, [])

  const getDropzoneAccept = useCallback((typeList: string[]) => {
    const typeObj: Record<string, string[]> = {};
    for (const type of typeList) {
      const target = mimeObj.find((i) => i.id === type);
      if (!target) {
        return;
      }
      const mimeTypeArray = Object.entries(target.type);
      for (const [fileName, mimeType] of mimeTypeArray) {
        typeObj[`${mimeType}`] = [`.${fileName}`];
      }
    }
    return typeObj;
  }, [])  

  const name2mime = useCallback((name: string) => {
    const nameType = name.split(".")[name.split(".").length - 1];
    const target = mimeObj.find((i) =>
      Object.keys(i.type).some((type) => type === nameType)
    );
    if (!target) {
      return "";
    }
    const mime = target.type[nameType];
    return mime;
  }, []);

  const path2blob = useCallback(async (path: string) => {
    return await api.downloadFile(path);
  }, []);

  return {
    uploadFile,
    getDropzoneAccept,
    getFileSize,
    getFileType,
    path2blob,
    name2mime,
  };
};
