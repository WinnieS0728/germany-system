import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { Main } from "@layouts/main";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { TrList } from "./tr";
import * as yup from "yup";
import { GetData } from "./data";
import { useEffect, useRef, useState } from "react";
import { SubmitBtn } from "@/components/UI/buttons";
import api from "@/lib/api";
import { setThreshold } from "@/data/actions/kpi threshold/threshold";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { monthType } from "@/types";

interface formData {
  EmpId: string;
  EmpName: string;
}
interface perMonthThreshold {
  existCus: number;
  newCus: number;
}

type thresholdData = Record<monthType, perMonthThreshold> & formData;

export const ThresholdSettingTable = () => {
  const { t } = useTranslation(["common"]);
  const timeData = useAppSelector((state) => state.time);
  const nowUser = useAppSelector((state) => state.nowUser);
  const nowUser_id = nowUser.body.EmpId;
  const [selected, setSelected] = useState<string>("");
  const [selectNumber, setSelectNumber] = useState<number>(0);
  const isDataSet = useRef(false);

  const dataSet = GetData().dataSet;
  const status = GetData().status;
  const dataExist = GetData().dataExist;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setThreshold(timeData.thisYear));
  }, [dispatch, timeData]);

  const monthAry = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const initData = dataSet;

  const percentSchema = yup.object({
    existCus: yup.number().min(0, "最小0").max(100, "最大100"),
    newCus: yup.number().min(0, "最小0").max(100, "最大100"),
  });

  const monthSchema = yup.object({
    Jan: percentSchema,
    Feb: percentSchema,
    Mar: percentSchema,
    Apr: percentSchema,
    May: percentSchema,
    Jun: percentSchema,
    Jul: percentSchema,
    Aug: percentSchema,
    Sep: percentSchema,
    Oct: percentSchema,
    Nov: percentSchema,
    Dec: percentSchema,
  });

  const schema = yup.object({
    threshold: yup.array().of(monthSchema),
  });

  const { register, handleSubmit, control, setValue } = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      threshold: initData,
    },
  });

  const { fields, replace } = useFieldArray({
    name: `threshold`,
    control,
  });

  // if (Object.keys(errors).length !== 0) {
  //   console.log(errors);
  // }

  useEffect(() => {
    if (isDataSet.current) {
      return;
    }
    if (status === "succeeded") {
      replace(dataSet);
      isDataSet.current = true;
    }
  }, [status, replace, dataSet]);

  useEffect(() => {
    let type;
    if (selected.endsWith("existCus")) {
      // console.log("修改既有客戶");
      type = "newCus";
    } else if (selected.endsWith("newCus")) {
      // console.log("修改新客戶");
      type = "existCus";
    }
    const spreadName = selected.split(".");
    const index = parseInt(spreadName[1]);
    const month = spreadName[2];

    setValue(`threshold.${index}.${month}.${type}` as any, 100 - selectNumber);
  }, [selected, setValue, selectNumber]);

  async function sendApiRequest(
    index: number,
    id: string,
    data: Record<string, number>
  ) {
    const checkDataIsExist = dataExist;
    const res = api.threshold.post(
      timeData.thisYear,
      id,
      data,
      checkDataIsExist[index],
      nowUser_id
    );
    return res;
  }

  async function onSubmit<T>(d: T) {
    const data = (d as { threshold: thresholdData[] }).threshold;

    const postStatus = Promise.all(
      data.map(async (d, index: number) => {
        const monthData: Record<string, number> = {};
        for (const m of monthAry) {
          monthData[m] = d?.[m as monthType]?.newCus;
        }

        return {
          name: d.EmpName,
          status: await sendApiRequest(index, d.EmpId, monthData),
        };
      })
    );

    const p = await postStatus;

    if (p.map((i) => i.status).every((i) => i === "設定新增完成")) {
      toast.success("設定成功");
    } else {
      toast.error(`設定失敗`);
    }
  }

  return (
    <Main>
      <>
        <SubmitBtn text={t("buttons.save")} />
        <Table title='客戶拜訪佔比警示值'>
          <>
            <form
              id='threshold'
              onSubmit={handleSubmit(onSubmit)}
            >
              <table>
                <thead>
                  <tr>
                    <td>NO.</td>
                    <td>業務</td>
                    <td>類別</td>
                    <td>{t("month.1")}</td>
                    <td>{t("month.2")}</td>
                    <td>{t("month.3")}</td>
                    <td>{t("month.4")}</td>
                    <td>{t("month.5")}</td>
                    <td>{t("month.6")}</td>
                    <td>{t("month.7")}</td>
                    <td>{t("month.8")}</td>
                    <td>{t("month.9")}</td>
                    <td>{t("month.10")}</td>
                    <td>{t("month.11")}</td>
                    <td>{t("month.12")}</td>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <TrList
                      field={field}
                      index={index}
                      key={field.id}
                      register={register}
                      setSelected={setSelected}
                      setSelectNumber={setSelectNumber}
                    />
                  ))}
                </tbody>
              </table>
            </form>
          </>
        </Table>
      </>
    </Main>
  );
};
