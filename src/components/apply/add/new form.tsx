import { IconBtn } from "@/components/UI/buttons";
import { Main } from "@/layouts/main";
import * as Icons from "@components/UI/icons";
import { Link } from "react-router-dom";
import { InfoForm } from "./info form";
import { TransportationForm } from "./trafic";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { MoneyForm } from "./money";
import { AgentForm } from "./agent";
import { AttachForm } from "./attach";
import { NewDetailForm } from "./detail/new detail";
import { useEffect } from "react";
import { Modal } from "@/layouts/modal";
import { TripDetailForm } from "./detail/trip detail block";
import { DevTool } from "@hookform/devtools";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Confirm } from "./confirm/confirm";
import { setDate } from "@/data/reducers/trip detail/trip detail";
import { useSelectRef } from "@/hooks/select ref";
import { timeDay, timeMonday } from "d3-time";
import { timeFormat } from "d3";
import api from "@/lib/api";
import { useData } from "./confirm/data";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorsModal } from "./errors";
import { UploadFiles } from "./upload files";

interface blockProp {
  children: JSX.Element;
  className?: string;
}
export const Block = ({ children }: blockProp) => {
  return (
    <div className={`rounded-md px-8 py-4 ring-2 ring-gray-300`}>
      {children}
    </div>
  );
};

const schema = yup.object().shape({
  DeptId: yup.string(),
  CreateId: yup.string(),
  Transport: yup.string().required("不寫交通工具是要用跑的嗎"),
  IsLodging: yup.string(),
  StayDays: yup.number(),
  Days: yup.number(),
  Advance_Amount: yup.mixed(),
  Curr: yup.string().when("Advance_Amount", {
    is: (money: string) => money !== "0",
    then: () => yup.string().required("幣別不寫給你玩具鈔票"),
    otherwise: () => yup.string(),
  }),
  Deputy: yup.string().required("沒有代理人你要開分身回來做嗎"),
  tripData: yup.array().of(
    yup.object().shape({
      startDate: yup.string().required("出差日期為必填"),
      endDate: yup.string().required("出差日期為必填"),
    })
  ),
});

export const NewForm = () => {
  const timeData = useAppSelector((state) => state.time);
  function getNextWeekStartEnd() {
    const thisMonday = timeMonday(new Date(timeData.today));
    const nextMonday = timeDay.offset(thisMonday, 7);
    const nextSunday = timeDay.offset(thisMonday, 13);
    function getTime(d: Date) {
      return timeFormat("%Y-%m-%d")(d);
    }
    return {
      nextMonday: getTime(nextMonday),
      nextSunday: getTime(nextSunday),
    };
  }

  const methods = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      DeptId: "",
      CreateId: "",
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

  const { clearNewFormSelect } = useSelectRef();

  const [toggleModal] = useModalControl("review");
  const [toggleErrorModal] = useModalControl("errors");
  const [toggleFilesModal] = useModalControl("files");

  const dateRange = getNextWeekStartEnd();

  const { spreadData } = useData();
  const tripDetailData = useAppSelector((state) => state.tripDetail).body;

  async function getCusId(name: string) {
    const res = await api.getCus(name, "DEU");

    return res?.[0].CustId;
  }

  function onSubmit<T>(d: T) {
    const newFormData = { ...d, ...dateRange };
    const formId = createNewForm(newFormData);
    const newData = Promise.all(
      spreadData.map(async (item, index) => {
        return {
          // TODO 帶入 formID
          BTPId: formId || "no id",
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
    pushData(newData);

    clearNewFormSelect();
  }

  async function createNewForm(data: any) {
    const res = await api.postNewForm(data);
    console.log(res);
  }

  async function pushData(data: any) {
    const res = await api.pushNewData(await data);
    console.log(res);
  }

  const watch_date = useWatch({
    name: "tripData",
    control: methods.control,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDate(watch_date));
  }, [watch_date, dispatch]);

  //  TODO 預防重新整理
  // useEffect(() => {
  //   function alertUser(event: any) {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   }
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => window.removeEventListener("beforeunload", alertUser);
  // }, []);
  useEffect(() => {
    if (spreadData.length === 0) {
      if (methods.formState.errors.tripData) {
        return;
      }
      methods.setError("tripData", {
        type: "custom",
        message: "沒出差還想送單啊",
      });
    }
    if (tripDetailData.some((d) => d.data.length === 0)) {
      if (methods.formState.errors.tripData) {
        return;
      }
      methods.setError("tripData", {
        type: "custom",
        message: "有漏欸",
      });
    }
  }, [methods, spreadData, tripDetailData]);

  function done() {
    methods.trigger();
    if (methods.formState.isValid) {
      toggleModal("on");
    } else {
      toggleErrorModal("on");
    }
  }

  return (
    <Main className='main-section-gap'>
      <>
        <div className='top-btn-list'>
          <button
            type='button'
            onClick={done}
          >
            <IconBtn
              icon={<Icons.Send />}
              primary
            >
              送簽表單
            </IconBtn>
          </button>
          <button type='button'>
            <IconBtn icon={<Icons.Save />}>暫存檔案</IconBtn>
          </button>
          <button
            type='button'
            onClick={() => {
              toggleFilesModal("on");
            }}
          >
            <IconBtn icon={<Icons.AddFiles />}>附加文件</IconBtn>
          </button>
          <button type='button'>
            <Link to={"../"}>
              <IconBtn icon={<Icons.Back />}>返回列表</IconBtn>
            </Link>
          </button>
        </div>
        <Modal name='errors'>
          <ErrorsModal errors={methods.formState.errors} />
        </Modal>
        <Modal name='newDetail'>
          <NewDetailForm />
        </Modal>
        <Modal name='review'>
          <Confirm />
        </Modal>
        <Modal name='files'>
          <UploadFiles />
        </Modal>
        <FormProvider {...methods}>
          <form
            id='business apply'
            onSubmit={methods.handleSubmit(onSubmit)}
            className='main-section-gap'
          >
            <Block>
              <InfoForm />
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
              <AttachForm />
            </Block>
          </form>
        </FormProvider>
        <DevTool control={methods.control} />
      </>
    </Main>
  );
};
