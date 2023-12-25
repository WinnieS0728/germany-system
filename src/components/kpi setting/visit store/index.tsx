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

type kpiInput = {
  EmpId: string; //員工
  EmpName: string;
  Jan: number;
  Feb: number;
};

type defaultValue = { store: kpiInput[] };

interface InputProps {
  index: number;
  month: Extract<(typeof month_shortName)[number], "Jan" | "Feb">;
}

interface totalProps {
  index: number;
  type: "atu" | "sticker";
}

export default function StoreTable() {
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisYear } = useTime();
  const { GetThreshold, PostThreshold } = useKpiSetting("store");
  const { data: kpiData, isPending, isError } = GetThreshold();
  const { mutate } = PostThreshold();

  const { handleSubmit, control, reset } = useForm<defaultValue>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: async () => ({
      store: salesList.map((sales) => {
        return {
          EmpId: sales.EmpId, //員工
          EmpName: sales.EmpName,
          Jan: 0,
          Feb: 0,
        };
      }),
    }),
  });

  useEffect(() => {
    reset({
      store: salesList.map((sales) => {
        const target = kpiData?.find((data) => data.EmpId === sales.EmpId);
        return {
          EmpId: sales.EmpId, //員工
          EmpName: sales.EmpName,
          Jan: target?.monthData[0] ?? 0,
          Feb: target?.monthData[1] ?? 0,
        };
      }),
    });
  }, [kpiData, reset, salesList]);

  const { fields } = useFieldArray({
    control,
    name: "store",
  });

  async function checkDataExist(EmpId: string): Promise<boolean> {
    const res = await api.getKpi({ year: thisYear, EmpId, type: "store" });
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async function onSubmit(data: defaultValue) {
    await Promise.all(
      data.store.map(async (data) => {
        mutate(
          {
            EmpId: data.EmpId,
            postType: (await checkDataExist(data.EmpId)) ? "update" : "create",
            data: {
              Jan: data.Jan,
              Feb: data.Feb,
            },
          },
          {
            onSuccess: () => {
              toast.success("設定成功");
            },
            onError: () => {
              toast.error("設定失敗");
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
        name={`store.${index}.${month}`}
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

  function TotalNumber({ index, type }: totalProps) {
    const formData = useWatch({
      control,
      name: "store",
    })[index];

    const dataSet = {
      atu: formData.Jan * 12,
      sticker: formData.Feb * 12,
    };

    return <p>{dataSet[type]}</p>;
  }

  if (isPending) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <>
      <Section title='拜訪店家目標設定'>
        <Table>
          <form
            id='store'
            onSubmit={handleSubmit(onSubmit)}
          >
            <table>
              <thead>
                <tr>
                  <th rowSpan={2}>NO.</th>
                  <th rowSpan={2}>業務</th>
                  <th colSpan={2}>A.T.U 每月拜訪店家數</th>
                  <th colSpan={2}>上傳店家貼 orange 貼紙的照片目標數量</th>
                </tr>
                <tr>
                  <th>月目標</th>
                  <th>年目標</th>
                  <th>月目標</th>
                  <th>年目標</th>
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
                      <TotalNumber
                        index={index}
                        type='atu'
                      />
                    </td>
                    <td>
                      <InputOnlyNumber
                        index={index}
                        month='Feb'
                      />
                    </td>
                    <td>
                      <TotalNumber
                        index={index}
                        type='sticker'
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