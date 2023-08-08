import { IconBtn } from "@/components/UI/buttons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import * as Icons from "@components/UI/icons";
import pdf from "@img/files/pdf_icon.svg";
import excel from "@img/files/excel_icon.svg";
import word from "@img/files/word_icon.svg";
import ppt from "@img/files/ppt_icon.svg";
import img from "@img/files/img_icon.svg";
import normal from "@img/files/file_icon.svg";
import styled from "styled-components";
import { deleteFile } from "@/data/reducers/files/attach";
import { component } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface id {
  id: string;
}
interface type {
  type: Record<string, string>;
}
const mineObj: (id & type)[] = [
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

function getAccept(type: string) {
  const mine = mineObj.find((i) => Object.keys(i.type).some((t) => t === type));
  return mine?.type[`${type}`];
}

const FileItem_o = ({
  file,
  className,
  index,
  d,
  type,
}: {
  file: File;
  className?: string;
  index: number;
  d?: (n: number) => void;
} & component) => {
  function getFileSize(num: number): string {
    if (num <= 1000) {
      return `${num} Byte`;
    } else if (num <= 1000 * 1000) {
      return `${(num / 1024).toFixed(1)} KB`;
    } else {
      return `${(num / 1024 / 1024).toFixed(1)} MB`;
    }
  }
  function getFileType(file: File): string {
    if (file.type.match(/^image/i)) {
      return img;
    } else if (file.name.match(/.pp(t|tx)$/i)) {
      return ppt;
    } else if (file.name.match(/.xl(s|sx)$/i)) {
      return excel;
    } else if (file.name.match(/.do(c|cx)$/i)) {
      return word;
    } else if (file.name.match(/.pdf$/i)) {
      return pdf;
    } else {
      return normal;
    }
  }

  const url = URL.createObjectURL(file);

  return (
    <section className={className}>
      <img
        src={getFileType(file)}
        alt='顯示圖案'
      />
      <div className='content'>
        <h3 className='title'>{file.name}</h3>
        <p className='size'>{`size: ${getFileSize(file.size)}`}</p>
        {type === "addForm" && (
          <button
            type='button'
            onClick={() => {
              (d as (n: number) => void)(index);
            }}
          >
            <IconBtn icon={<Icons.Delete size='1.25rem' />}>刪除</IconBtn>
          </button>
        )}
        {type === "sign" && (
          <a
            href={url}
            download
          >
            <button type='button'>
              <IconBtn icon={<Icons.Download size='1.25rem' />}>下載</IconBtn>
            </button>
          </a>
        )}
      </div>
    </section>
  );
};
const FileItem = styled(FileItem_o)`
  display: flex;
  padding: 1rem 2rem;
  gap: 2rem;
  img {
    width: 4rem;
  }
  .content{
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    gap: .5rem;
    flex: 1;
  }
  .title {
    font-size: 1.25rem;
  }
  .size {
    font-size: large.8rem;
    padding-left: 0.5rem;
    color: ${(props) => props.theme.color.sectionHeader};
  }
  button {
    padding: 0;
    width: 10rem;
  }
`;

export const AttachForm = ({ type }: component) => {
  const fileData = useAppSelector((state) => state.files);

  const newFiles = fileData.body;
  const formAttach = fileData.backend;

  const [attachList, setAttachList] = useState<File[]>([]);

  useEffect(() => {
    const a = Promise.all(
      formAttach.map(async (file, index) => {
        const res = await axios({
          method: "GET",
          url: `https://orangeapi.orange-electronic.com/api/Download?file=${file.FilePath}`,
          responseType: "blob",
        });
        const type =
          file.FileName.split(".")[file.FileName.split(".").length - 1];

        return new File([res.data], `${file.WebID} - ${index + 1}`, {
          type: getAccept(type),
        });
      })
    );
    (async function () {
      if ((await a).length === 0) {
        return;
      } else {
        setAttachList(await a);
      }
    })();
  }, [formAttach]);

  const dispatch = useAppDispatch();
  function deleteFiles(index: number) {
    dispatch(deleteFile(index));
  }

  return (
    <section className='flex'>
      <div className='w-full'>
        <p>表單附件 : </p>
        <article
          className={
            type === "addForm" ? "grid grid-cols-2" : "grid grid-cols-1"
          }
        >
          {newFiles.map((file, index) => (
            <FileItem
              file={file}
              index={index}
              d={deleteFiles}
              key={index}
              type='addForm'
            />
          ))}
        </article>
      </div>
      {type === "sign" && (
        <div className='w-full'>
          <p>原有附件 : </p>
          <article className={"grid grid-cols-1"}>
            {attachList.map((file, index) => (
              <FileItem
                file={file}
                index={index}
                key={index}
                type='sign'
              />
            ))}
          </article>
        </div>
      )}
    </section>
  );
};
