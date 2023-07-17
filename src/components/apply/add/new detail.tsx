import { MySelect } from "@/components/form/select";
import { useModelControlContext } from "@/hooks/model control";
import api from "@/lib/api";
import * as Btns from "@components/UI/buttons";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "styled-components";

interface trProps {
  label: string;
  children: JSX.Element;
}
const Tr = ({ label, children }: trProps) => {
  const color = useTheme()?.color;
  return (
    <tr>
      <td style={{ backgroundColor: color.tableBgc }}>
        <label>{label}</label>
      </td>
      <td>{children}</td>
    </tr>
  );
};

export const NewDetailForm = () => {
  const color = useTheme()?.color;
  const modelControl = useModelControlContext();
  const { register, handleSubmit, control } = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      purpose: "",
      district: "",
      city: "",
      postalCode: "",
      cus: "",
      hotel: "",
      PS: "",
    },
  });

  async function getEventOptions() {
    const res = await api.getTripEvent();

    return res.map((i: { ResourcesName: string; ResourcesId: string }) => {
      return {
        label: i.ResourcesName,
        value: i.ResourcesId,
      };
    });
  }

  function onSubmit<T>(d: T) {
    console.log(d);
    modelControl.setShow(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        modelControl.setShow(false);
      }}
      className={`w-2/3 space-y-4 rounded-xl px-8 py-6`}
      style={{ backgroundColor: color.white }}
    >
      <table>
        <thead>
          <tr>
            <th
              colSpan={2}
              className='text-start'
              style={{
                backgroundColor: color.sectionHeader,
                color: color.white,
              }}
            >
              出差地點明細
            </th>
          </tr>
        </thead>
        <tbody>
          <Tr label='出差事由'>
            <Controller
              control={control}
              name='purpose'
              render={({ field: { onChange } }) => (
                <MySelect.Async
                  options={getEventOptions}
                  onChange={onChange}
                  placeholder='選擇出差事由...'
                />
              )}
            />
          </Tr>
          <Tr label='行政區'>
            <Controller
              control={control}
              name='district'
              render={({ field: { onChange } }) => (
                <MySelect.Normal
                  options={[]}
                  onChange={onChange}
                  placeholder='選擇行政區...'
                />
              )}
            />
          </Tr>
          <Tr label='郵遞區號'>
            <Controller
              control={control}
              name='postalCode'
              render={({ field: { onChange } }) => (
                <MySelect.Normal
                  options={[]}
                  onChange={onChange}
                  placeholder='選擇郵遞區號...'
                />
              )}
            />
          </Tr>
          <Tr label='城市'>
            <input
              type='text'
              {...register("city")}
              className='w-full'
              autoComplete='off'
              placeholder='輸入城市...'
            />
          </Tr>
          <Tr label='客戶名稱'>
            <div className='space-y-2'>
              <Controller
                control={control}
                name='cus'
                render={({ field: { onChange } }) => (
                  <MySelect.Normal
                    options={[]}
                    onChange={onChange}
                    placeholder='選擇客戶...'
                  />
                )}
              />
              <button
                type='button'
                className='w-full'
                style={{
                  color: color.white,
                  backgroundColor: color.createCus,
                }}
              >
                查無資料，請建立客戶資訊
              </button>
            </div>
          </Tr>
          <Tr label='住宿飯店 or 地點'>
            <input
              type='text'
              {...register("hotel")}
              className='w-full'
              autoComplete='off'
              placeholder='輸入住宿飯店...'
            />
          </Tr>
          <Tr label='備註'>
            <input
              type='text'
              {...register("PS")}
              className='w-full'
              autoComplete='off'
              placeholder='輸入出差目的...'
            />
          </Tr>
        </tbody>
      </table>
      <div className='flex items-center justify-center gap-4'>
        <Btns.LongBtn type='reset' />
        <Btns.LongBtn type='submit' />
      </div>
    </form>
  );
};
