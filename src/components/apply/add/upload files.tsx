import { Table } from "@/components/table/table";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled, { useTheme } from "styled-components";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch } from "@/hooks/redux";
import { addFile } from "@/data/reducers/files/attach";

const mineObj = [
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
      jpeg: "image/jpeg",
      png: "image/png",
    },
  },
];

function getAccept(typeList: string[]) {
  const typeObj: { [key: string]: string[] } = {};
  for (const type of typeList) {
    const target = mineObj.find((i) => i.id === type);
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

const getColor = (props: any) => {
  if (props.$isDragAccept) {
    return "#00e676";
  }
  if (props.$isDragReject) {
    return "#ff1744";
  }
  if (props.$isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const FileInput = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
    cursor: pointer;
`;

export const UploadFiles = () => {
  const color = useTheme()?.color;

  const [fileList, setFileList] = useState<File[]>([]);
  const onDrop = useCallback((files: File[]) => {
    setFileList((prev) => {
      const array = prev.concat([...files]);
      return array;
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: getAccept(["img", "word", "ppt", "excel"]),
    });

  function handleDeleteFile(index: number) {
    const array = [...fileList];
    array.splice(index, 1);
    setFileList(array);
  }

  const dispatch = useAppDispatch();
  function sendFile() {
    for (const file of fileList) {
      dispatch(addFile(file));
    }
    toggleFileModal("off");
    setFileList([]);
  }

  const [toggleFileModal] = useModalControl("files");

  function getFileSize(num: number): string {
    if (num <= 1000) {
      return `${num} Byte`;
    } else if (num <= 1000 * 1000) {
      return `${(num / 1024).toFixed(1)} KB`;
    } else {
      return `${(num / 1024 / 1024).toFixed(1)} MB`;
    }
  }

  return (
    <article
      className='modal space-y-4'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='border-b-4 py-4 text-center text-3xl'>檔案檔案</h2>
      <form>
        <FileInput
          {...getRootProps({
            $isFocused: isFocused,
            $isDragAccept: isDragAccept,
            $isDragReject: isDragReject,
          })}
        >
          <input
            {...getInputProps({
              name: "files",
              id: "files",
            })}
          />
          <p>
            {isFocused
              ? "選擇檔案"
              : isDragAccept
              ? "快放手"
              : isDragReject
              ? "欸不對"
              : "點擊或拖曳檔案"}
          </p>
        </FileInput>
        <p className='text-end text-[#bdbdbd]'>
          接受格式 : word, ppt, excel, image( JPEG, PNG )
        </p>
      </form>
      <Table title='檔案列表'>
        <table>
          <thead>
            <tr>
              <th>檔名</th>
              <th>檔案大小</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            {fileList.length === 0 ? (
              <tr>
                <td colSpan={3}>no file upload</td>
              </tr>
            ) : (
              fileList.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{getFileSize(file.size)}</td>
                  <td className='w-16'>
                    <div
                      className='flex cursor-pointer items-center justify-center'
                      onClick={() => {
                        handleDeleteFile(index);
                      }}
                    >
                      <Icons.Delete size='1.25rem' />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Table>
      <div className='flex items-center justify-center gap-4'>
        <Btns.LongBtn
          type='button'
          style='cancel'
          onClick={() => {
            setFileList([]);
            toggleFileModal("off");
          }}
        />
        <Btns.LongBtn
          type='button'
          style='confirm'
          onClick={sendFile}
        />
      </div>
    </article>
  );
};
