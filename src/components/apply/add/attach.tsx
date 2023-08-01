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

const FileItem_o = ({
  file,
  className,
  index,
  d,
}: {
  file: File;
  className?: string;
  index: number;
  d: (n: number) => void;
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
  return (
    <section className={className}>
      <img
        src={getFileType(file)}
        alt='顯示圖案'
      />
      <div className='content'>
        <h3 className='title'>{file.name}</h3>
        <p className='size'>{`size: ${getFileSize(file.size)}`}</p>
        <button
          type='button'
          onClick={() => {
            d(index);
          }}
        >
          <IconBtn icon={<Icons.Delete size="1.25rem"/>}>刪除</IconBtn>
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

export const AttachForm = () => {
  const fileData = useAppSelector((state) => state.files).body;
  // console.log(fileData);

  const dispatch = useAppDispatch();
  function deleteFiles(index: number) {
    dispatch(deleteFile(index));
  }

  return (
    <div>
      <p>表單附件 : </p>
      <article className='grid grid-cols-2'>
        {fileData.map((file, index) => (
          <FileItem
            file={file}
            index={index}
            d={deleteFiles}
            key={index}
          />
        ))}
      </article>
    </div>
  );
};

// E-system 新增德國管理報表，德國主管更能掌握業務以及客戶的狀況
// 1. 讓業務可以知道超過4個月沒下單的或是超過6個月沒拜訪的客戶名單，業務可以去拜訪這些客戶(各業務只能看到自己的客戶，Ismail/Marcus可以看到全部)
// 2. 每月各業務的銷售分成舊客戶跟新客戶(列出list)
// 3. 讓業務可以看到客戶accounts receivable, coupons, points的狀況
// 4. 可以查看每個客戶前筆訂單的金額跟數量
// 5. 可以看到每個客戶OSOM登入次數(show by ranking from high to low)
// 6. 每個業務每月目標達成狀況
// 7. 每個員工每個月拜訪次數跟訂單數
// 詳情如附件
