import { MySelect } from "@/components/form/select";
import { addData } from "@/data/reducers/trip detail/trip detail";
import { useModelControl } from "@/hooks/model control";
import { useAppDispatch } from "@/hooks/redux";
import api from "@/lib/api";
import * as Btns from "@components/UI/buttons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
  const { register, handleSubmit, control, reset, setValue } = useForm({
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

  const { closeModel } = useModelControl("newDetail");

  interface optionsType {
    label: string;
    value: string;
  }
  function filterOptions(input: string, options: optionsType[]) {
    return options.filter((o) =>
      o.label.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function getEventOptions(input: string) {
    const res = await api.getTripEvent();

    const options = res.map(
      (i: { ResourcesName: string; ResourcesId: string }) => {
        return {
          label: i.ResourcesName,
          value: i.ResourcesName,
        };
      }
    );

    return filterOptions(input, options);
  }
  async function getAreaOptions(input: string) {
    const res = await api.getArea("DEU");

    const options = res.map((i: { Country: string; CountryId: string }) => {
      return {
        label: i.Country,
        value: i.Country,
      };
    });

    return filterOptions(input, options);
  }

  const watch_area = useWatch({
    name: "district",
    control,
  });

  const [postOptions, setPostOptions] = useState();

  useEffect(() => {
    async function a() {
      const res = await api.getPostCode();

      const codeInThisState = res.filter(
        (c: { state: string }) => c.state === watch_area
      );

      const noRepeatData = [
        ...new Set(codeInThisState.map((i: { zipcode: string }) => i.zipcode)),
      ];

      const options = noRepeatData.map((code) => {
        return {
          label: code,
          value: code,
        };
      });

      setPostOptions(options as any);
    }
    a();
  }, [watch_area]);

  const watch_postcode = useWatch({
    name: "postalCode",
    control,
  });

  const [cusOptions, setCusOptions] = useState();

  const getCusOptions = useCallback(
    async function () {
      const res = await api.getCus("DEU");

      const cusInThisCity = res.filter(
        (c: { PostalCode: string }) => c.PostalCode === watch_postcode
      );

      const cusOptions = cusInThisCity.map(
        (i: { CustName: string; CustId: string }) => {
          return {
            label: i.CustName,
            value: i.CustName,
          };
        }
      );

      setCusOptions(cusOptions);
    },
    [watch_postcode]
  );
  const getCity = useMemo(
    async function () {
      const res = await api.getPostCode();

      const city = res.find(
        (i: { zipcode: string }) => i.zipcode === watch_postcode
      );

      if (city) {
        return city.place;
      }
    },
    [watch_postcode]
  );

  useEffect(() => {
    getCusOptions();
    async function setCity() {
      setValue("city", await getCity);
    }
    setCity();
  }, [getCusOptions, getCity, setValue]);

  const dispatch = useAppDispatch();
  function onSubmit<T>(d: T) {
    // console.log(d);
    reset();
    dispatch(addData(d));
    closeModel();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
        closeModel();
      }}
      className={`w-full space-y-4 rounded-xl px-8 py-6`}
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
                <MySelect.Async
                  options={getAreaOptions}
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
                  options={postOptions}
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
              readOnly
            />
          </Tr>
          <Tr label='客戶名稱'>
            <Controller
              control={control}
              name='cus'
              render={({ field: { onChange } }) => (
                <MySelect.Normal
                  options={cusOptions}
                  onChange={onChange}
                  placeholder='選擇客戶...'
                  noOptionComponent={
                    <a
                      href='https://esys.orange-electronic.com/Customer/CustomerList'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
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
                    </a>
                  }
                />
              )}
            />
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
