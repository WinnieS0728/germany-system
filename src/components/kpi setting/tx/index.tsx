import { Table } from "@/components/table/table";
import { useAppSelector } from "@/data/store";
import { Section } from "@/layouts/section";
import { month_shortName } from "@/types";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useKpiSetting } from "../data.hook";
import { useEffect } from "react";
import api from "@/api";
import { useTime } from "@/hooks/useTime";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type kpiInput = {
  EmpId: string; //員工
  EmpName: string;
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
};

type defaultValue = { tx: kpiInput[] };

interface InputProps {
  index: number;
  month: (typeof month_shortName)[number];
}

interface totalProps {
  index: number;
  season: "s1" | "s2" | "s3" | "s4" | "all";
}

export default function TxTable() {
  const { t } = useTranslation(["kpiSetting"]);
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisYear } = useTime();
  const { GetThreshold, PostThreshold } = useKpiSetting("tx");
  const { data: kpiData, isPending, isError } = GetThreshold();
  const { mutate } = PostThreshold();

  const { handleSubmit, control, reset } = useForm<defaultValue>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: async () => ({
      tx: salesList.map((sales) => {
        return {
          EmpId: sales.EmpId, //員工
          EmpName: sales.EmpName,
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
        };
      }),
    }),
  });

  useEffect(() => {
    reset({
      tx: salesList.map((sales) => {
        const target = kpiData?.find((data) => data.EmpId === sales.EmpId);
        return {
          EmpId: sales.EmpId, //員工
          EmpName: sales.EmpName,
          Jan: target?.monthData[0] ?? 0,
          Feb: target?.monthData[1] ?? 0,
          Mar: target?.monthData[2] ?? 0,
          Apr: target?.monthData[3] ?? 0,
          May: target?.monthData[4] ?? 0,
          Jun: target?.monthData[5] ?? 0,
          Jul: target?.monthData[6] ?? 0,
          Aug: target?.monthData[7] ?? 0,
          Sep: target?.monthData[8] ?? 0,
          Oct: target?.monthData[9] ?? 0,
          Nov: target?.monthData[10] ?? 0,
          Dec: target?.monthData[11] ?? 0,
        };
      }),
    });
  }, [kpiData, reset, salesList]);

  const { fields } = useFieldArray({
    control,
    name: "tx",
  });

  async function checkDataExist(EmpId: string): Promise<boolean> {
    const res = await api.getKpi({ year: thisYear, EmpId, type: "tx" });
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async function onSubmit(data: defaultValue) {
    await Promise.all(
      data.tx.map(async (data) => {
        mutate(
          {
            EmpId: data.EmpId,
            postType: (await checkDataExist(data.EmpId)) ? "update" : "create",
            data: {
              Jan: data.Jan,
              Feb: data.Feb,
              Mar: data.Mar,
              Apr: data.Apr,
              May: data.May,
              Jun: data.Jun,
              Jul: data.Jul,
              Aug: data.Aug,
              Sep: data.Sep,
              Oct: data.Oct,
              Nov: data.Nov,
              Dec: data.Dec,
            },
          },
          {
            onSuccess: () => {
              toast.success(t("setting.success"));
            },
            onError: () => {
              toast.error(t("setting.error"));
            },
          }
        );
      })
    );
  }

  function InputOnlyNumber({ index, month }: InputProps) {
    return (
      <Controller
        control={control}
        name={`tx.${index}.${month}`}
        render={({ field }) => (
          <>
            <input
              className='w-20'
              {...field}
              onClick={(event) => {
                (event.target as HTMLInputElement).value = "";
              }}
              onChange={(event) => {
                const input = (event.target as HTMLInputElement).value;
                const value = input.replace(/[^0-9]/gi, "");
                field.onChange(Number(value));
              }}
              onBlur={(event) => {
                const input = event.target.value;
                if (input === "") {
                  event.target.value = "0";
                  field.onChange(0);
                }
              }}
              autoComplete='off'
            />
          </>
        )}
      />
    );
  }

  function TotalNumber({ index, season }: totalProps) {
    const formData = useWatch({
      control,
      name: "tx",
    })[index];

    const dataSet = {
      s1: formData.Jan + formData.Feb + formData.Mar,
      s2: formData.Apr + formData.May + formData.Jun,
      s3: formData.Jul + formData.Aug + formData.Sep,
      s4: formData.Oct + formData.Nov + formData.Dec,
      all: () => {
        return dataSet.s1 + dataSet.s2 + dataSet.s3 + dataSet.s4;
      },
    };

    return <p>{season === "all" ? dataSet.all() : dataSet[season]}</p>;
  }

  if (isPending) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <>
      <Section title={t("tx.title")}>
        <Table>
          <form
            id='tx'
            onSubmit={handleSubmit(onSubmit)}
          >
            <table>
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>{t("sales")}</th>
                  {[1, 4, 7, 10].map((month, index) => (
                    <Thead
                      key={index}
                      season={index + 1}
                      month={month}
                    />
                  ))}
                  <th className='bg-[#D2EEFF]'>{t("tx.total.year")}</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td>{index + 1}</td>
                    <td>{field.EmpName}</td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Jan'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Feb'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Mar'
                      />
                    </td>
                    <td className='bg-[#FFE6DA]'>
                      <TotalNumber
                        index={index}
                        season='s1'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Apr'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='May'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Jun'
                      />
                    </td>
                    <td className='bg-[#FFE6DA]'>
                      <TotalNumber
                        index={index}
                        season='s2'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Jul'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Aug'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Sep'
                      />
                    </td>
                    <td className='bg-[#FFE6DA]'>
                      <TotalNumber
                        index={index}
                        season='s3'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Oct'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Nov'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Dec'
                      />
                    </td>
                    <td className='bg-[#FFE6DA]'>
                      <TotalNumber
                        index={index}
                        season='s4'
                      />
                    </td>
                    <td className='bg-[#D2EEFF]'>
                      <TotalNumber
                        index={index}
                        season='all'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </Table>
      </Section>
    </>
  );
}

function Thead({ season, month }: { season: number; month: number }) {
  const {
    t,
    i18n: { language },
  } = useTranslation(["kpiSetting"]);
  const chineseMonth = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const englishMonth = month_shortName;

  const mm =
    language === "en"
      ? englishMonth.slice(month-1, month + 3)
      : chineseMonth.slice(month-1, month + 3);

  return (
    <>
      <th>{mm[0]}</th>
      <th>{mm[1]}</th>
      <th>{mm[2]}</th>
      <th className='bg-[#FFE6DA]'>{t("tx.total.season", { season })}</th>
    </>
  );
}
