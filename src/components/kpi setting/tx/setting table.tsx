import { Table } from "@/components/table/table";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { TxDataType, useTxData } from "./data";
import { useEffect } from "react";
import { cn } from "@/utils/cn";
import { useAppSelector } from "@data/store";
import api from "@/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface inputProps {
  index: number;
  value: "s1" | "s2" | "s3" | "s4";
  className?: string;
}
function InputOnlyNumber({ index, value, className }: inputProps) {
  const { register } = useFormContext();
  function onlyNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const onlyNumber = input.replace(/[^0-9]/gi, "");

    if (!onlyNumber) {
      e.target.value = "";
    } else {
      const value = parseInt(onlyNumber).toLocaleString();
      e.target.value = value;
    }
  }
  function clearValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = "";
  }
  function resetValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      e.target.value = "0";
    }
  }
  return (
    <input
      type='text'
      className={cn("text-end max-w-[10rem]", className)}
      onChangeCapture={onlyNumber}
      {...register(`tx.${index}.${value}`, {
        setValueAs: (value: string) => value.replace(/,/gi, ""),
      })}
      onFocusCapture={clearValue}
      onBlurCapture={resetValue}
      autoComplete='off'
    />
  );
}

export function TxSettingTable() {
  const { t } = useTranslation(["settingPage", "toast"]);
  const { thisYear } = useAppSelector((state) => state.time);
  const { EmpId } = useAppSelector((state) => state.nowUser).body;
  const { data } = useTxData();

  const methods = useForm({
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      tx: data,
    },
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    reset({ tx: data });
  }, [reset, data]);

  const { fields } = useFieldArray({
    name: "tx",
    control,
  });

  function onSubmit(data: Record<"tx", TxDataType[]>) {
    // console.log(data);
    const request = new Promise((resolve, reject) => {
      (async function () {
        const resList = await Promise.all(
          data.tx.map(async (data) => {
            const res = await api.tx.post(
              thisYear,
              data.EmpId,
              data,
              data.dataExist,
              EmpId
            );
            return res;
          })
        );
        if (resList.every((res) => res === "設定新增完成")) {
          resolve(true);
        }
        reject(false);
      })();
    });
    toast.promise(request, {
      pending: t("settingRequest.pending", { ns: "toast", lng: "zh" }),
      success: t("settingRequest.success", { ns: "toast", lng: "zh" }),
      error: t("settingRequest.fail", { ns: "toast", lng: "zh" }),
    });
  }

  return (
    <Table title={t("tx.title", { lng: "zh" })}>
      <FormProvider {...methods}>
        <form
          id='tx'
          onSubmit={handleSubmit(onSubmit)}
        >
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>
                  {t("tx.thead.sales", {
                    lng: "zh",
                  })}
                </th>
                <th>
                  {t("tx.thead.s1", {
                    lng: "zh",
                  })}
                </th>
                <th>
                  {t("tx.thead.s2", {
                    lng: "zh",
                  })}
                </th>
                <th>
                  {t("tx.thead.s3", {
                    lng: "zh",
                  })}
                </th>
                <th>
                  {t("tx.thead.s4", {
                    lng: "zh",
                  })}
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                return (
                  <tr key={field.id}>
                    <td>{index + 1}</td>
                    <td>{field.EmpName}</td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        value='s1'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        value='s2'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        value='s3'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        value='s4'
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </FormProvider>
    </Table>
  );
}
