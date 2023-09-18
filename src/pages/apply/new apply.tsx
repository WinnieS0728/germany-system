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
import { lang } from "@/hooks/email";
import { emailData } from "@/lib/api/common/email";

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
export type tripData = {
  startDate: string;
  endDate: string;
}[];

export type NewFormDefaultValue = infoForm &
  transportation &
  money &
  deputy &
  Record<"tripData", tripData>;

export const NewForm = () => {
  const color = useTheme()?.color;
  const { t } = useTranslation(["common", "new form", "errors", "toast"]);
  const timeData = useAppSelector((state) => state.time);
  const tripDetail = useAppSelector((state) => state.tripDetail).body;
  const { EmpId, DeptId } = useAppSelector((state) => state.nowUser).body;

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
    DeptId: yup.string().required("表單錯誤"),
    CreateId: yup.string().required("表單錯誤"),
    Transport: yup
      .string()
      .required(t("newForm.transportation", { ns: "errors" })),
    IsLodging: yup.string().required("表單錯誤"),
    StayDays: yup.number().required("表單錯誤"),
    Days: yup.number().required("表單錯誤"),
    Advance_Amount: yup.mixed().required("表單錯誤"),
    Curr: yup.string().when("Advance_Amount", {
      is: (money: string) => money !== "0",
      then: () => yup.string().required(t("newForm.curr", { ns: "errors" })),
      otherwise: () => yup.string(),
    }),
    Deputy: yup.string(),
    tripData: yup.array().of(
      yup.object().shape({
        startDate: yup.string().required(t("newForm.date", { ns: "errors" })),
        endDate: yup.string().required(t("newForm.date", { ns: "errors" })),
      })
    ),
  }) as yup.ObjectSchema<NewFormDefaultValue>;

  const methods = useForm<NewFormDefaultValue>({
    criteriaMode: "all",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      DeptId: DeptId,
      CreateId: EmpId,
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
    const signList = await api.getSignList(formId);
    const recipient = signList[1].SIGNER;
    const recipientUseLang = (await api.getMember(recipient))[0].Language;

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
    const emailData: Record<lang, emailData> = {
      "zh-TW": {
        Sub: `E-system 系統通知 - 德國出差申請單, 表單號碼 : ${formId}, 待簽核`,
        Messg: `<p>您好 : <br />
          <span style="margin-left: 2rem; line-height: 2;">
            請協助簽核
            <b style="font-size: 1.25rem;">
              ⟪ ${EmpId} 的出差申請單 ⟫
            </b>, 
            表單號碼
            <b style="font-size: 1.25rem;">
              ${formId}
            </b>,
          </span> <br />           
          <span style="margin-left: 2rem;">
            可點選連結進入 E-system 查看 : 
            <a href="https://esys.orange-electronic.com/ODF/Sales_Travel?id=TravelAppDe&formN=index">
              表單連結
            </a>
          </span> <br /><br /><br />
          ※ 此為系統自動通知，請勿直接回覆郵件，感謝您！
        </p>`,
      },
      "en-US": {
        Sub: `E-system notification - Germany Business Trip Apply, formId : ${formId}, sign off completed`,
        Messg: `
        <p>Hi : <br />
          <span style="margin-left: 2rem; line-height: 2;">
            your business trip apply
            <b style="font-size: 1.25rem;">
              is sign off complete
            </b>, 
            formId
            <b style="font-size: 1.25rem;">
              ${formId}
            </b>,
          </span> <br />
          <span style="margin-left: 2rem;">
            Click the link to enter the E-system view : 
            <a href="https://esys.orange-electronic.com/ODF/Sales_Travel?id=TravelAppDe&formN=index">
              page link
            </a>
          </span> <br /><br /><br />
          ※ This is an automatic notification from the system. Please do not reply to the email directly. Thank you !
        </p>
      `,
      },
    };

    const emailDataFinal = emailData[`${recipientUseLang}`];
    api.sendEmail(recipient, emailDataFinal);

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

  function pushData(data: tripDetailType[]) {
    api.pushNewData(data);
  }

  useLayoutEffect(() => {
    function alertUser(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", alertUser);
    return () => window.removeEventListener("beforeunload", alertUser);
  }, []);

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
