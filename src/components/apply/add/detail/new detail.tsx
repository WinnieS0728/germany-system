import { MySelect } from "@/components/form/select";
import { pushData } from "@/data/reducers/trip detail/trip detail";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch } from "@/hooks/redux";
import api from "@/lib/api";
import * as Btns from "@components/UI/buttons";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTheme } from "styled-components";
import { useOptions } from "../../../../hooks/options";
import { useSelectRef } from "@/hooks/select ref";
import { Required } from "@/components/form/required";
import { setErrors } from "@/data/reducers/error/errors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Table } from "@/components/table/table";

interface trProps {
  label: string;
  children: JSX.Element;
  required?: boolean;
}
const Tr = ({ label, children, required }: trProps) => {
  const color = useTheme()?.color;
  return (
    <tr>
      <td style={{ backgroundColor: color.tableBgc }}>
        <label className='relative'>
          {required && <Required />}
          {label}
        </label>
      </td>
      <td>{children}</td>
    </tr>
  );
};

const schema = yup.object().shape({
  purpose: yup.string().required("原因沒填"),
  district: yup.string().required("地區沒填"),
  postalCode: yup.string().required("郵遞區號沒填"),
  city: yup.string(),
  cus: yup.string().required("客戶沒填"),
  hotel: yup.string(),
  PS: yup.string(),
});

export const NewDetailForm = () => {
  const color = useTheme()?.color;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    resolver: yupResolver(schema),
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

  const { newDetailRef, clearDetailSelect } = useSelectRef();

  const [toggleModal] = useModalControl("newDetail");
  const [toggleErrorModal] = useModalControl("errors");

  const { options } = useOptions();

  const watch_area = useWatch({
    name: "district",
    control,
  });

  const watch_postcode = useWatch({
    name: "postalCode",
    control,
  });

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
    async function setCity() {
      setValue("city", await getCity);
    }
    setCity();
  }, [getCity, setValue]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const dispatch = useAppDispatch();
  function validate() {
    if (Object.keys(errors).length === 0) {
      return;
    } else {
      dispatch(setErrors(errors));
      toggleErrorModal("on");
    }
  }

  function onSubmit<T>(d: T) {
    // console.log(d);
    reset();
    dispatch(pushData(d));
    toggleModal("off");
  }

  return (
    <>
      <form
        id='new detail'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          reset();
          clearDetailSelect();
          toggleModal("off");
        }}
        className={`modal space-y-4`}
        style={{ backgroundColor: color.white }}
      >
        <Table>
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
              <Tr
                label='出差事由'
                required
              >
                <Controller
                  control={control}
                  name='purpose'
                  rules={{ required: "出差事由必填" }}
                  render={({ field: { onChange } }) => (
                    <MySelect.Async
                      forwardRef={newDetailRef.purpose}
                      options={options.event}
                      onChange={onChange}
                      value='ResourcesName'
                      placeholder='選擇出差事由...'
                      getLabelFunction={(option: any) => option.ResourcesName}
                      getValueFunction={(option: any) => option.ResourcesName}
                    />
                  )}
                />
              </Tr>
              <Tr
                label='行政區'
                required
              >
                <Controller
                  control={control}
                  name='district'
                  rules={{ required: "行政區必填" }}
                  render={({ field: { onChange } }) => (
                    <MySelect.Async
                      forwardRef={newDetailRef.country}
                      options={options.area}
                      onChange={onChange}
                      value='Country'
                      placeholder='選擇行政區...'
                      getLabelFunction={(option: any) => option.Country}
                      getValueFunction={(option: any) => option.Country}
                    />
                  )}
                />
              </Tr>
              <Tr
                label='郵遞區號'
                required
              >
                <Controller
                  control={control}
                  name='postalCode'
                  rules={{ required: "郵遞區號必填" }}
                  render={({ field: { onChange } }) => (
                    <MySelect.Async
                      forwardRef={newDetailRef.postalCode}
                      options={options.postalCode}
                      onChange={onChange}
                      placeholder='選擇郵遞區號...'
                      getLabelFunction={(option: any) =>
                        `${option.zipcode} / ${option.place}`
                      }
                      getValueFunction={(option: any) => option.zipcode}
                      filterFunction={(candidate) => {
                        if (candidate.data.state === watch_area) {
                          return true;
                        }

                        return false;
                      }}
                      value='zipcode'
                    />
                  )}
                />
              </Tr>
              <Tr label='城市'>
                <input
                  type='text'
                  {...register("city")}
                  className='noBorder w-full'
                  autoComplete='off'
                  readOnly
                />
              </Tr>
              <Tr
                label='客戶名稱'
                required
              >
                <Controller
                  control={control}
                  name='cus'
                  rules={{ required: "客戶必填" }}
                  render={({ field: { onChange } }) => (
                    <MySelect.Async
                      forwardRef={newDetailRef.cus}
                      options={options.cus}
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
                      getLabelFunction={(option: any) => option.CustName}
                      getValueFunction={(option: any) => option.CustName}
                      value='CustName'
                      filterFunction={(candidate) => {
                        if (candidate.data.PostalCode === watch_postcode) {
                          return true;
                        }
                        return false;
                      }}
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
        </Table>
        <div className='submit-btns'>
          <Btns.LongBtn
            type='reset'
            style='cancel'
            form='new detail'
          />
          <Btns.LongBtn
            type='submit'
            style='confirm'
            form='new detail'
            onClick={validate}
          />
        </div>
      </form>
    </>
  );
};
