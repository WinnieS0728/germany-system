import { useCallback,  useState } from "react";
import { useDropzone } from "react-dropzone";
import { useExcel2Json } from "./excel2json";
import { useFiles } from "./hooks/files";
import * as xlsx from "xlsx";
import * as FileSaver from "file-saver";

export function AA() {
  const [excelFile, setExcelFile] = useState<File[]>([]);

  const onDrop = useCallback((files: File[]) => {
    setExcelFile(files);
  }, []);

  const { getDropzoneAccept } = useFiles();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getDropzoneAccept(["excel"]),
  });

  const res = useExcel2Json(excelFile as File[]);

  function exportCSV() {
    if (typeof res === "string") {
      return;
    }
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(res.json);
    const workbook: xlsx.WorkBook = {
      Sheets: { person: worksheet },
      SheetNames: ["person"],
    };
    const fileBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([fileBuffer]);
    FileSaver.saveAs(file, "test.xlsx");
  }

  return (
    <>
      <div className='flex items-center justify-center gap-4 py-8'>
        <div
          className='cursor-pointer p-4 text-center ring-4'
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>drop files</p>
        </div>
        <button
          type='button'
          className='ring-4'
          onClick={exportCSV}
        >
          export excel
        </button>
      </div>
      {typeof res === "string" ? (
        <p className='text-center text-xl'>{res}</p>
      ) : (
        <table className='mx-auto w-1/2'>
          <thead>
            <tr>
              {res?.data.head.map((d, i) => (
                <th key={i}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {res?.data.body.map((d, i) => (
              <tr key={i}>
                {d.map((d2, i2) => (
                  <td key={i2}>{d2}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
