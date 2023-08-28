import { MySelect } from "@/components/form/select";
import {
  detailData_data,
  pushData,
} from "@/data/reducers/trip detail/trip detail";
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
import { useTranslation } from "react-i18next";
import { tripEvent } from "@/lib/api/event/get event";
import { areaResType } from "@/lib/api/common/getArea";
import { postcodeResType } from "@/lib/api/postal code/postal code";
import { cusResType } from "@/lib/api/common/getCus";
import { tripEvent as tripEvent_enum } from "@/types";

interface trProps {
  label: string;
  children: JSX.Element;
  required?: boolean;
}

export type newDetailType = detailData_data & { purposeName?: string };

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

const NewDetailForm = () => {
  const { i18n, t } = useTranslation("list page", { keyPrefix: "detailTable" });
  const nowLang = i18n.language;
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

  const watch_purpose = useWatch({
    name: "purpose",
    control,
  });

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
                  {t("title")}
                </th>
              </tr>
            </thead>
            <tbody>
              <Tr
                label={t("thead.purpose")}
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
                      value='ResourcesId'
                      placeholder={t("placeholder.event")}
                      getLabelFunction={(option: tripEvent) => {
                        if (nowLang === "en") {
                          return option.ResourcesName_E;
                        }
                        return option.ResourcesName;
                      }}
                      getValueFunction={(option: tripEvent) =>
                        option.ResourcesId
                      }
                    />
                  )}
                />
              </Tr>
              <Tr
                label={t("thead.dist")}
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
                      placeholder={t("placeholder.dist")}
                      getLabelFunction={(option: areaResType) => {
                        if (nowLang === "en") {
                          return option.Country_E;
                        }
                        return option.Country;
                      }}
                      getValueFunction={(option: areaResType) => option.Country}
                    />
                  )}
                />
              </Tr>
              <Tr
                label={t("postcode")}
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
                      placeholder={t("placeholder.code")}
                      getLabelFunction={(option: postcodeResType) =>
                        `${option.zipcode} / ${option.place}`
                      }
                      getValueFunction={(option: postcodeResType) =>
                        option.zipcode
                      }
                      filterFunction={(candidate: {
                        data: postcodeResType;
                      }) => {
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
              <Tr label={t("thead.city")}>
                <input
                  type='text'
                  {...register("city")}
                  className='noBorder w-full'
                  autoComplete='off'
                  readOnly
                />
              </Tr>
              <Tr
                label={t("thead.cus")}
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
                      placeholder={t("placeholder.cus")}
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
                      getLabelFunction={(option: cusResType) => option.CustName}
                      getValueFunction={(option: cusResType) => option.CustName}
                      value='CustName'
                      filterFunction={(candidate: { data: cusResType }) => {
                        if (candidate.data.PostalCode === watch_postcode) {
                          if (watch_purpose === tripEvent_enum.atu) {
                            if (candidate.data.CustName.startsWith("A.T.U")) {
                              return true;
                            } else {
                              return false;
                            }
                          } else {
                            if (candidate.data.CustName.startsWith("A.T.U")) {
                              return false;
                            } else {
                              return true;
                            }
                          }
                        }
                        return false;
                      }}
                    />
                  )}
                />
              </Tr>
              <Tr label={t("thead.lodging")}>
                <input
                  type='text'
                  {...register("hotel")}
                  className='w-full'
                  autoComplete='off'
                  placeholder={t("placeholder.lodging")}
                />
              </Tr>
              <Tr label={t("thead.PS")}>
                <input
                  type='text'
                  {...register("PS")}
                  className='w-full'
                  autoComplete='off'
                  placeholder={t("placeholder.purpose")}
                />
              </Tr>
            </tbody>
          </table>
        </Table>
        <div className='submit-btns'>
          <Btns.LongBtn
            type='submit'
            style='confirm'
            form='new detail'
            onClick={validate}
          />
          <Btns.LongBtn
            type='reset'
            style='cancel'
            form='new detail'
          />
        </div>
      </form>
    </>
  );
};

export default NewDetailForm;
