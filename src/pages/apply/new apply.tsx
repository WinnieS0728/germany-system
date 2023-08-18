import { IconBtn } from "@/components/UI/buttons";
import { Main } from "@/layouts/main";
import * as Icons from "@components/UI/icons";
import { Link, useNavigate } from "react-router-dom";
import { InfoForm } from "../../components/apply/add/info form";
import { TransportationForm } from "../../components/apply/add/trafic";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { MoneyForm } from "../../components/apply/add/money";
import { AgentForm } from "../../components/apply/add/agent";
import { AttachForm } from "../../components/apply/add/attach";
import { useEffect, useLayoutEffect } from "react";
import { TripDetailForm } from "../../components/apply/add/detail/trip detail block";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearData, setDate } from "@/data/reducers/trip detail/trip detail";
import { useSelectRef } from "@/hooks/select ref";
import { timeDay, timeMonday } from "d3-time";
import api from "@/lib/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "styled-components";
import { Block } from "@/layouts/block";
import { setErrors } from "@/data/reducers/error/errors";
import { useFiles } from "@/hooks/files";
import { Hamburger } from "@/layouts/hamburger";
import { tripDetailType } from "@/lib/api/travel apply/push details";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { clearFile } from "@/data/reducers/files/attach";
import { dateFormatter } from "@/hooks/dateFormatter";
import { useTripDataProcessing } from "@/components/apply/add/confirm/data";
import { PopupLayer } from "@/layouts/popup";
import { dataFromForm } from "@/lib/api/travel apply/create new form";
import { moneyType } from "@/types";

export interface infoForm {
  DeptId: string;
  CreateId: string;
}
export interface transportation {
  Transport: string;
  IsLodging: "No" | "Yes";
  StayDays: number;
  Days: number;
}
export interface money {
  Advance_Amount: string;
  Curr: moneyType | "";
}
export interface deputy {
  Deputy: string;
}
export interface tripData {
  [index: number]: {
    startDate: string;
    endDate: string;
  };
}

type NewFormDefaultValue = infoForm &
  transportation &
  money &
  deputy &
  tripData;

export const NewForm = () => {
  const color = useTheme()?.color;
  const { t } = useTranslation(["common", "new form", "errors", "toast"]);
  const timeData = useAppSelector((state) => state.time);
  const tripDetail = useAppSelector((state) => state.tripDetail).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;

  const { clearNewFormSelect } = useSelectRef();
  const dateRange = getNextWeekStartEnd();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { uploadFile } = useFiles();
  const { spreadData } = useTripDataProcessing(tripDetail, timeData.today);

  const [toggleModal] = useModalControl("review");
  const [toggleErrorModal] = useModalControl("errors");
  const [toggleFilesModal] = useModalControl("files");

  const schema = yup.object().shape({
    DeptId: yup.string(),
    CreateId: yup.string(),
    Transport: yup
      .string()
      .required(t("newForm.transportation", { ns: "errors" })),
    IsLodging: yup.string(),
    StayDays: yup.number(),
    Days: yup.number(),
    Advance_Amount: yup.mixed(),
    Curr: yup.string().when("Advance_Amount", {
      is: (money: string) => money !== "0",
      then: () => yup.string().required(t("newForm.curr", { ns: "errors" })),
      otherwise: () => yup.string(),
    }),
    Deputy: yup.string().required(t("newForm.deputy", { ns: "errors" })),
    tripData: yup.array().of(
      yup.object().shape({
        startDate: yup.string().required(t("newForm.date", { ns: "errors" })),
        endDate: yup.string().required(t("newForm.date", { ns: "errors" })),
      })
    ),
  });
  const methods = useForm({
    criteriaMode: "all",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      DeptId: nowUser.DeptId,
      CreateId: nowUser.EmpId,
      Transport: "",
      IsLodging: "No",
      StayDays: 0,
      Days: 0,
      Advance_Amount: "0",
      Curr: "",
      Deputy: "",
      tripData: [],
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isValid },
  } = methods;

  const watch_date = useWatch({
    name: "tripData",
    control: control,
  });

  useEffect(() => {
    trigger();
  }, [trigger, tripDetail, watch_date]);

  useEffect(() => {
    dispatch(setDate(watch_date));
  }, [watch_date, dispatch]);

  function getNextWeekStartEnd() {
    const thisMonday = timeMonday(new Date(timeData.today));
    const nextMonday = timeDay.offset(thisMonday, 7);
    const nextSunday = timeDay.offset(thisMonday, 13);
    return {
      StartDT: dateFormatter(nextMonday),
      EndDT: dateFormatter(nextSunday),
    };
  }

  async function getCusId(name: string) {
    const res = await api.getCus(name, "DEU");

    return res?.[0].CustId;
  }

  async function onSubmit<T>(d: T) {
    const newFormData = {
      ...(d as Omit<dataFromForm, "StartDT" | "EndDT">),
      ...dateRange,
    };

    toast.promise(send(newFormData), {
      pending: t("newForm.pending"),
      success: t("newForm.success"),
      error: t("newForm.fail"),
    });
    toggleModal("off");
  }

  async function send(data: dataFromForm) {
    const formId = await createNewForm(data);

    const newData: tripDetailType[] = await Promise.all(
      spreadData.map(async (item, index) => {
        return {
          BTPId: formId,
          Item: index + 1,
          CustId: await getCusId(item.data.cus),
          TripEvent: item.data.purpose,
          Description: item.data.PS,
          Country: "DEU", // 國家
          Area: item.data.district, // 地區
          City: item.data.city, // 城市
          Hotel: item.data.hotel,
          StartDT: item.date[0],
          EndDT: item.date[item.date.length - 1],
        };
      })
    );
    // console.log("要送的明細", newData);

    pushData(newData);
    uploadFile(formId);

    clearNewFormSelect();
    dispatch(clearData());
    dispatch(clearFile());

    toggleModal("off");
    setTimeout(() => {
      navigate(`../`);
    }, 1000);
  }

  async function createNewForm(data: dataFromForm) {
    const res = await api.postNewForm(data);
    return res;
  }

  async function pushData(data: tripDetailType[]) {
    const res = await api.pushNewData(await data);
    // console.log("建立出差明細元件", res);
    // return 新增成功
  }

  //  TODO 預防重新整理
  // useLayoutEffect(() => {
  //   function alertUser(event: any) {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   }
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => window.removeEventListener("beforeunload", alertUser);
  // }, []);
  useEffect(() => {
    if (spreadData.length === 0) {
      if (errors.tripData) {
        return;
      }
      setError("tripData", {
        type: "custom",
        message: t("newForm.noData", { ns: "errors" }),
      });
    }
    if (tripDetail.some((d) => d.data.length === 0)) {
      if (errors.tripData) {
        return;
      }
      setError("tripData", {
        type: "custom",
        message: t("newForm.lostData", { ns: "errors" }),
      });
    }
  }, [errors, setError, spreadData, t, tripDetail]);

  function done() {
    trigger();
    dispatch(setErrors(errors));
    if (isValid) {
      toggleModal("on");
    } else {
      toggleErrorModal("on");
    }
  }

  return (
    <>
      <PopupLayer />
      <Main className='main-section-gap'>
        <>
          <div className='top-btn-list'>
            <Hamburger>
              <>
                <button
                  type='button'
                  onClick={done}
                >
                  <IconBtn
                    icon={
                      <Icons.Send
                        size='1.5rem'
                        color={color.white}
                      />
                    }
                    primary
                  >
                    {t("btn.send", { ns: "new form" })}
                  </IconBtn>
                </button>
                <button
                  type='button'
                  onClick={() => {
                    toggleFilesModal("on");
                  }}
                >
                  <IconBtn icon={<Icons.AddFiles size='1.5rem' />}>
                    {t("btn.attach", { ns: "new form" })}
                  </IconBtn>
                </button>
              </>
            </Hamburger>
            <button type='button'>
              <Link to={"../"}>
                <IconBtn icon={<Icons.Back size='1.25rem' />}>
                  {t("btn.back", { ns: "new form" })}
                </IconBtn>
              </Link>
            </button>
          </div>
          <FormProvider {...methods}>
            <form
              id='business apply'
              onSubmit={handleSubmit(onSubmit)}
              className='main-section-gap'
            >
              <Block>
                <InfoForm type='addForm' />
              </Block>
              <Block>
                <TransportationForm />
              </Block>
              <TripDetailForm />
              <Block>
                <MoneyForm />
              </Block>
              <Block>
                <AgentForm />
              </Block>
              <Block>
                <AttachForm type='addForm' />
              </Block>
            </form>
          </FormProvider>
        </>
      </Main>
    </>
  );
};
