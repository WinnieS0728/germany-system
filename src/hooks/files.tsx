import api from "@/lib/api";
import { useAppSelector } from "./redux";
import excel from "@img/files/excel_icon.svg";
import word from "@img/files/word_icon.svg";
import ppt from "@img/files/ppt_icon.svg";
import pdf from "@img/files/pdf_icon.svg";
import img from "@img/files/img_icon.svg";
import normal from "@img/files/file_icon.svg";
import { useCallback } from "react";

interface id {
  id: string;
}
interface type {
  type: Record<string, string>;
}
const mimeObj: (id & type)[] = [
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
      numbers: "application/x-iwork-numbers-sffnumbers"
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
  const {nowOrder} = useAppSelector((state) => state.formInfo).body;

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

  function getFileSize(num: number): string {
    if (num <= 1000) {
      return `${num} Byte`;
    } else if (num <= 1000 * 1000) {
      return `${(num / 1024).toFixed(1)} KB`;
    } else {
      return `${(num / 1024 / 1024).toFixed(1)} MB`;
    }
  }

  function getFileType(fileType: string): {
    type: string;
    src: string;
  } {
    const target = mimeObj.find((i) =>
      Object.values(i.type).some((mime) => mime === fileType)
    );

    if (!target) {
      return {
        type: "",
        src: "",
      };
    }

    let imgSrc;
    switch (target.id) {
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
    return { type: target.id, src: imgSrc };
  }

  function getDropzoneAccept(typeList: string[]) {
    const typeObj: { [key: string]: string[] } = {};
    for (const type of typeList) {
      const target = mimeObj.find((i) => i.id === type);
      if (!target) {
        return;
      }
      const a = Object.entries(target.type);
      for (const s of a) {
        typeObj[s[1]] = [`.${s[0]}`];
      }
    }
    return typeObj;
  }

  const name2mime = useCallback((name: string) => {
    function name2mime(name: string): string {
      const nameType = name.split(".")[name.split(".").length - 1];
      const target = mimeObj.find((i) =>
        Object.keys(i.type).some((type) => type === nameType)
      );
      if (!target) {
        return "";
      }
      const mime = target.type[nameType];
      return mime;
    }
    return name2mime(name);
  }, []);

  const path2blob = useCallback((path: string) => {
    async function path2blob(path: string) {
      const res = await api.downloadFile(path);
      return res;
    }
    return path2blob(path);
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
