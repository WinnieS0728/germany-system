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
import { dontShowError } from "@/hooks/no error plz";
import { Modal } from "@/layouts/modal";
import { ErrorsModal } from "../errors";

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

export const NewDetailForm = () => {
  const color = useTheme()?.color;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
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

  const { newDetailRef, clearDetailSelect } = useSelectRef();

  const [isOpen, toggleModal] = useModalControl("newDetail");
  const [is2Open, toggleErrorModal] = useModalControl("errors");
  dontShowError([isOpen, is2Open]);

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

  console.log(errors);

  // TODO 用不出來
  const dispatch = useAppDispatch();
  function onSubmit<T>(d: T) {
    // console.log(d);
    // reset();
    // dispatch(pushData(d));
    // toggleModal("off");
  }

  return (
    <>
      <Modal name='errors'>
        <ErrorsModal errors={errors} />
      </Modal>
      <form
        id='new detail'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          reset();
          clearDetailSelect();
          toggleModal("off");
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
            <Tr
              label='出差事由'
              required
            >
              <Controller
                control={control}
                name='purpose'
                rules={{ required: "出差事由為必填項目" }}
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
                rules={{ required: "行政區為必填項目" }}
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
                rules={{ required: "郵遞區號為必填項目" }}
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
                rules={{ required: "客戶名稱為必填項目" }}
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
        <div className='flex items-center justify-center gap-4'>
          <Btns.LongBtn
            type='reset'
            style='cancel'
            form='new detail'
          />
          <Btns.LongBtn
            type='submit'
            style='confirm'
            form='new detail'
          />
        </div>
      </form>
    </>
  );
};
