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
};

type defaultValue = { osom: kpiInput[] };

interface InputProps {
  index: number;
  month: Extract<(typeof month_shortName)[number], "Jan">;
}

interface totalProps {
  index: number;
}

export default function OsomTable() {
  const { t } = useTranslation(["kpiSetting"]);
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisYear } = useTime();
  const { GetThreshold, PostThreshold } = useKpiSetting("osom");
  const { data: kpiData, isPending, isError } = GetThreshold();
  const { mutate } = PostThreshold();

  const { handleSubmit, control, reset } = useForm<defaultValue>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: async () => ({
      osom: salesList.map((sales) => {
        return {
          EmpId: sales.EmpId, //員工
          EmpName: sales.EmpName,
          Jan: 0,
        };
      }),
    }),
  });

  useEffect(() => {
    reset({
      osom: salesList.map((sales) => {
        const target = kpiData?.find((data) => data.EmpId === sales.EmpId);
        return {
          EmpId: sales.EmpId, //員工
          EmpName: sales.EmpName,
          Jan: target?.monthData[0] ?? 0,
        };
      }),
    });
  }, [kpiData, reset, salesList]);

  const { fields } = useFieldArray({
    control,
    name: "osom",
  });

  async function checkDataExist(EmpId: string): Promise<boolean> {
    const res = await api.getKpi({ year: thisYear, EmpId, type: "osom" });
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async function onSubmit(data: defaultValue) {
    await Promise.all(
      data.osom.map(async (data) => {
        mutate(
          {
            EmpId: data.EmpId,
            postType: (await checkDataExist(data.EmpId)) ? "update" : "create",
            data: {
              Jan: data.Jan,
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
        name={`osom.${index}.${month}`}
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

  function TotalNumber({ index }: totalProps) {
    const formData = useWatch({
      control,
      name: "osom",
    })[index];

    return <p>{formData.Jan * 12}</p>;
  }

  if (isPending) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <>
      <Section title={t("osom.title")}>
        <Table>
          <form
            id='osom'
            onSubmit={handleSubmit(onSubmit)}
          >
            <table>
              <thead>
                <tr>
                  <th rowSpan={2}>NO.</th>
                  <th rowSpan={2}>{t("sales")}</th>
                  <th colSpan={2}>{t("osom.recommend")}</th>
                </tr>
                <tr>
                  <th>{t("achievement.month")}</th>
                  <th>{t("achievement.year")}</th>
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
                      <TotalNumber index={index} />
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
