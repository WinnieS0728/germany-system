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
import { useEffect } from "react";
import { TripDetailForm } from "../../components/apply/add/detail/trip detail block";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setDate } from "@/data/reducers/trip detail/trip detail";
import { useSelectRef } from "@/hooks/select ref";
import { timeDay, timeMonday } from "d3-time";
import { timeFormat } from "d3";
import api from "@/lib/api";
import { useData } from "../../components/apply/add/confirm/data";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "styled-components";
import { Block } from "@/layouts/block";
import { setErrors } from "@/data/reducers/error/errors";
import { useFiles } from "@/hooks/files";
import { Modal } from "@/layouts/modal";
import { NewDetailForm } from "../../components/apply/add/detail/new detail";
import { Confirm } from "../../components/apply/add/confirm/confirm";
import { UploadFiles } from "../../components/apply/add/upload files";
import { ErrorsModal } from "../../components/apply/add/errors";
import { Hamburger } from "@/layouts/hamberger";
import { tripDetailType } from "@/lib/api/travel apply/push details";
import { Flip, toast } from "react-toastify";
import { createNewForm } from "@/lib/api/travel apply/create new form";

const schema = yup.object().shape({
  DeptId: yup.string(),
  CreateId: yup.string(),
  Transport: yup.string().required("交通工具必填"),
  IsLodging: yup.string(),
  StayDays: yup.number(),
  Days: yup.number(),
  Advance_Amount: yup.mixed(),
  Curr: yup.string().when("Advance_Amount", {
    is: (money: string) => money !== "0",
    then: () => yup.string().required("金額不為 0 時幣別必填"),
    otherwise: () => yup.string(),
  }),
  Deputy: yup.string().required("代理人必填"),
  tripData: yup.array().of(
    yup.object().shape({
      startDate: yup.string().required("出差日期必填"),
      endDate: yup.string().required("出差日期必填"),
    })
  ),
});

export const NewForm = () => {
  const color = useTheme()?.color;
  const timeData = useAppSelector((state) => state.time);
  const tripDetail = useAppSelector((state) => state.tripDetail);
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

  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isValid },
  } = methods;
  const { clearNewFormSelect } = useSelectRef();

  const [toggleModal] = useModalControl("review");
  const [toggleErrorModal] = useModalControl("errors");
  const [toggleFilesModal] = useModalControl("files");

  const dateRange = getNextWeekStartEnd();

  const { spreadData } = useData(tripDetail.body, timeData.today);
  const tripDetailData = useAppSelector((state) => state.tripDetail).body;

  const navigate = useNavigate();

  async function getCusId(name: string) {
    const res = await api.getCus(name, "DEU");

    return res?.[0].CustId;
  }

  const { uploadFile } = useFiles();
  async function onSubmit<T>(d: T) {
    const newFormData = { ...d, ...dateRange };
    const uploadData = toast.loading("處理中...");
    const formId = await createNewForm(newFormData);

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

    toast.update(uploadData, {
      type: "success",
      render: "上傳成功",
      isLoading: false,
      transition: Flip,
      autoClose: 3000,
      closeOnClick: true,
      closeButton: true,
    });
    setTimeout(() => {
      navigate("../");
    }, 1000);

    clearNewFormSelect();
  }

  async function createNewForm(data: any) {
    const res = await api.postNewForm(data);
    return res;
  }

  async function pushData(data: tripDetailType[]) {
    const res = await api.pushNewData(await data);
    // console.log("建立出差明細元件", res);
    // return 新增成功
  }

  const watch_date = useWatch({
    name: "tripData",
    control: control,
  });
  const watch_money = useWatch({
    name: ["Advance_Amount", "Curr"],
    control: control,
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
      if (errors.tripData) {
        return;
      }
      setError("tripData", {
        type: "custom",
        message: "至少要有一筆出差資料",
      });
    }
    if (tripDetailData.some((d) => d.data.length === 0)) {
      if (errors.tripData) {
        return;
      }
      setError("tripData", {
        type: "custom",
        message: "出差資料填寫不完全",
      });
    }
  }, [errors, setError, spreadData, tripDetailData]);

  useEffect(() => {
    trigger();
  }, [watch_date, tripDetailData, watch_money, trigger]);

  function done() {
    trigger();
    dispatch(setErrors(errors));
    if (isValid) {
      toggleModal("on");
    } else {
      toggleErrorModal("on");
    }
  }

  const myErrors = useAppSelector((state) => state.errors);

  return (
    <>
      <Modal name='newDetail'>
        <NewDetailForm />
      </Modal>
      <Modal name='review'>
        <Confirm />
      </Modal>
      <Modal name='files'>
        <UploadFiles />
      </Modal>
      <Modal name='errors'>
        <ErrorsModal errors={myErrors.body} />
      </Modal>
      <Main className='main-section-gap'>
        <>
          <div className='top-btn-list'>
            <Hamburger
              list={[
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
                    送簽表單
                  </IconBtn>
                </button>,
                <button
                  type='button'
                  onClick={() => {
                    toggleFilesModal("on");
                  }}
                >
                  <IconBtn icon={<Icons.AddFiles size='1.5rem' />}>
                    附加文件
                  </IconBtn>
                </button>,
              ]}
            />
            <button type='button'>
              <Link to={"../"}>
                <IconBtn icon={<Icons.Back size='1.25rem' />}>返回列表</IconBtn>
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
