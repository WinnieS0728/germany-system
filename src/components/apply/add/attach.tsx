import { IconBtn } from "@/components/UI/buttons";
import { useAppSelector } from "@/hooks/redux";
import * as Icons from "@components/UI/icons";
import pdf from "@img/files/pdf_icon.svg";
import excel from "@img/files/excel_icon.svg";
import word from "@img/files/word_icon.svg";
import ppt from "@img/files/ppt_icon.svg";
import styled from "styled-components";

const FileItem_o = ({
  file,
  className,
}: {
  file: File;
  className?: string;
}) => {
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
    if (file.name.match(/.ppt[x]\b/g)) {
      return ppt;
    } else if (file.name.match(/.xls[x]\b/i)) {
      return excel;
    } else if (file.name.match(/.doc[x]\b/i)) {
      return word;
    } else if (file.name.match(/.pdf\b/i)) {
      return pdf;
    } else {
      return "";
    }
  }
  return (
    <section className={className}>
      <img
        src={getFileType(file)}
        alt='顯示圖案'
      />
      <div className='content'>
        <h3 className='title'>{file.name}</h3>
        <p className='size'>{`size: ${getFileSize(file.size)}`}</p>
        <button type='button'>
          <IconBtn icon={<Icons.Delete />}>刪除</IconBtn>
        </button>
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
  }
  .title {
    font-size: 1.25rem;
  }
  .size {
    font-size: large.8rem;
    padding-left: 0.5rem;
    color: ${(props) => props.theme.color.sectionHeader};
  }
`;

export const AttachForm = () => {
  const fileData = useAppSelector((state) => state.files).body;
  // console.log(fileData);

  function deleteFile(index: number) {
    console.log(index);
  }

  return (
    <div>
      <p>表單附件 : </p>
      <article className='grid grid-cols-2'>
        {fileData.map((file, index) => (
          <FileItem
            file={file}
            key={index}
          />
        ))}
      </article>
    </div>
  );
};
