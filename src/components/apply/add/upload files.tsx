import { Table } from "@/components/table/table";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled, { useTheme } from "styled-components";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch } from "@/hooks/redux";
import { addFile } from "@/data/reducers/files/attach";
import { useFiles } from "@/hooks/files";
import { useTranslation } from "react-i18next";

type styleProp = {
  $isFocused: boolean;
  $isDragAccept: boolean;
  $isDragReject: boolean;
};

const getColor = (props: styleProp) => {
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

const FileInput = styled.div<styleProp>`
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

function UploadFiles() {
  const { t } = useTranslation("files");
  const color = useTheme()?.color;
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<File[]>([]);
  const { getFileSize, getDropzoneAccept } = useFiles();
  const [toggleFileModal] = useModalControl("files");

  const onDrop = useCallback((files: File[]) => {
    setFileList((prev) => {
      const array = prev.concat([...files]);
      return array;
    });
  }, []);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: getDropzoneAccept(["img", "word", "ppt", "excel", "pdf"]),
    });

  function handleDeleteFile(index: number) {
    const array = [...fileList];
    array.splice(index, 1);
    setFileList(array);
  }

  function sendFile() {
    for (const file of fileList) {
      dispatch(addFile(file));
    }
    toggleFileModal("off");
    setFileList([]);
  }

  return (
    <article
      className='modal space-y-4'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='border-b-4 py-4 text-center text-3xl'>{t("title")}</h2>
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
              ? t("box.focus")
              : isDragAccept
              ? t("box.success")
              : isDragReject
              ? t("box.reject")
              : t("box.idle")}
          </p>
        </FileInput>
        <p className='text-end text-[#bdbdbd]'>
          {t("accept")} : word, ppt, excel, image( JPEG, PNG )
        </p>
      </form>
      <Table title={t("table.title")}>
        <table>
          <thead>
            <tr>
              <th>{t("table.fileName")}</th>
              <th>{t("table.size")}</th>
              <th>{t("table.delete")}</th>
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
      <div className='submit-btns'>
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
}

export default UploadFiles