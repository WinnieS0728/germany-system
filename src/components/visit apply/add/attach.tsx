import { IconBtn } from "@/components/UI/buttons";
import { useAppDispatch, useAppSelector } from "@data/store";
import * as Icons from "@components/UI/icons";
import styled from "styled-components";
import { deleteFile } from "@/data/reducers/files/attach";
import { component } from "@/types";
import { useEffect, useState } from "react";
import { useFiles } from "@/hooks/useFiles";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("new form");
  const { getFileSize, getFileType } = useFiles();

  const url = URL.createObjectURL(file);

  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <section className={className}>
      <img
        src={getFileType(file.type).src}
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
            <IconBtn icon={<Icons.Delete size='1.25rem' />}>
              {t("attach.delete")}
            </IconBtn>
          </button>
        )}
        {type === "sign" && (
          <a
            href={url}
            download
          >
            <button type='button'>
              <IconBtn icon={<Icons.Download size='1.25rem' />}>
                {t("attach.download")}
              </IconBtn>
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
  .content {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    gap: 0.5rem;
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
    max-width: 15rem;
  }
`;

export const AttachForm = ({ type }: component) => {
  const { t } = useTranslation("new form", { keyPrefix: "attach" });
  const fileData = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  const newFiles = fileData.body.newFile;
  const formAttach = fileData.body.formAttach;

  const [attachList, setAttachList] = useState<File[]>([]);

  const { name2mime, path2blob } = useFiles();

  useEffect(() => {
    (async function () {
      const fileList = await Promise.all(
        formAttach.map(async (file, index) => {
          const blob = await path2blob(file.FilePath);

          return new File([blob], `${file.WebID} - ${index + 1}`, {
            type: name2mime(file.FileName),
          });
        })
      );

      if (fileList.length === 0) {
        return;
      }
      setAttachList(fileList);
    })();
  }, [formAttach, name2mime, path2blob]);

  function deleteFiles(index: number) {
    dispatch(deleteFile(index));
  }

  return (
    <section
      className={`grid ${
        type === "addForm" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      <div className='w-full'>
        <p>{t("new")} : </p>
        <article
          className={`${
            type === "addForm"
              ? "grid grid-cols-1 sm:grid-cols-2"
              : "grid grid-cols-1"
          }`}
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
          <p>{t("old")} : </p>
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
