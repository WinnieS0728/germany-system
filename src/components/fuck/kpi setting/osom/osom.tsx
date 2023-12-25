import { Table } from "@/components/table/table";
import { cn } from "@/utils/cn";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import api from "@/api";
import { useAppSelector } from "@/data/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface inputProps {
  name: keyof formData;
  className?: string;
}
function InputOnlyNumber({ name, className }: inputProps) {
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
      className={cn("text-center", className)}
      onChangeCapture={onlyNumber}
      {...register(name, {
        setValueAs: (value: string) => value.replace(/,/gi, ""),
      })}
      onFocusCapture={clearValue}
      onBlurCapture={resetValue}
      autoComplete='off'
    />
  );
}

const formSchema = z.object({
  recommend_store: z.string(),
  osom_login: z.string(),
  tireStorage_data: z.string(),
});

type formData = z.infer<typeof formSchema>;

export function OsomSettingTable() {
  const { t } = useTranslation(["settingPage", "toast"]);
  const { EmpId } = useAppSelector((state) => state.nowUser).body;
  const methods = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recommend_store: "0",
      osom_login: "0",
      tireStorage_data: "0",
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    (async function () {
      const res = await api.basicSetting.get({
        webName: "GER_kpiSetting_osom",
      });

      const obj: Record<string, string | number> = {};
      for (const data of res) {
        obj[`${data.ColName}`] = data.SetValue;
      }

      reset(obj);
    })();
  }, [reset]);

  async function onSubmit(data: formData) {
    const dataArray = Object.entries(data) as [keyof formData, string][];

    const requestArray = await Promise.all(
      dataArray.map(async (data) => {
        const basId = await getBasId(data[0]);
        if (basId) {
          return api.basicSetting.update({
            basId,
            EmpId,
            webName: "GER_kpiSetting_osom",
            key: data[0],
            value: data[1],
          });
        }
        return api.basicSetting.set({
          webName: "GER_kpiSetting_osom",
          EmpId,
          key: data[0],
          value: data[1],
        });
      })
    );

    const request = new Promise((resolve, reject) => {
      if (requestArray.some((res) => res === "失敗")) {
        reject(false);
      }
      resolve(true);
    });

    toast.promise(request, {
      pending: t("settingRequest.pending", { ns: "toast", lng: 'zh' }),
      success: t("settingRequest.success", { ns: "toast", lng: 'zh' }),
      error: t("settingRequest.fail", { ns: "toast", lng: 'zh' }),
    });
  }

  async function getBasId(key: keyof formData) {
    const res = await api.basicSetting.get({
      webName: "GER_kpiSetting_osom",
      key: key,
    });

    if (res.length === 0) {
      return "";
    }
    return res[0].BASID;
  }

  return (
    <>
      <Table title={t("osom.title",{lng:'zh'})}>
        <>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id='osom'
            >
              <table>
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>{t("osom.thead.label",{lng:'zh'})}</th>
                    <th>{t("osom.thead.value",{lng:'zh'})}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{t("osom.recommend",{lng:'zh'})}</td>
                    <td>
                      <InputOnlyNumber name='recommend_store' />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>{t("osom.login.label",{lng:'zh'})}</td>
                    <td>
                      <p className='flex justify-center items-center gap-4'>
                        <span>{t("osom.add",{lng:'zh'})}</span>
                        <InputOnlyNumber name='osom_login' />
                        <span>{t("osom.login.unit",{lng:'zh'})}</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>{t("osom.tsData.label",{lng:'zh'})}</td>
                    <td>
                      <p className='flex justify-center items-center gap-4'>
                        <span>{t("osom.add",{lng:'zh'})}</span>
                        <InputOnlyNumber name='tireStorage_data' />
                        <span>{t("osom.tsData.unit",{lng:'zh'})}</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </FormProvider>
        </>
      </Table>
    </>
  );
}
