import { TopBtn } from "@/components/UI/buttons";
import { Main } from "@/layouts/main";
import * as Icons from "@components/UI/icons";
import { Link } from "react-router-dom";
import { InfoForm } from "./header";
import { TransportationForm } from "./trafic";
import { FormProvider, useForm } from "react-hook-form";
import { MoneyForm } from "./money";
import { AgentForm } from "./agent";
import { AttachForm } from "./attach";
import { NewDetailForm } from "./new detail";
import { useEffect } from "react";
import { Model } from "@/layouts/model";
import { TripDetailForm } from "./detail/trip detail block";
import { DevTool } from "@hookform/devtools";
import { useModelControl } from "@/hooks/model control";
import { useAppSelector } from "@/hooks/redux";
import axios from "axios";
import api from "@/lib/api";

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
export const NewForm = () => {
  const methods = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      Transport: "",
      IsLodging: "N",
      StayDays: 0,
      Advance_Amount: "0",
      Curr: "",
      Deputy: "",
    },
  });

  const { openModel } = useModelControl("review");

  const a = useAppSelector((state) => state.tripDetail);

  function onSubmit<T>(d: T) {
    console.log(d);
    console.log(a.body);

    openModel();
  }

  //  TODO 預防重新整理
  function alertUser(e: any) {
    e.preventDefault();
    e.returnValue = "";
    return null;
  }

  useEffect(() => {
    // window.addEventListener("beforeunload", alertUser);
    // return () => {
    //   window.removeEventListener("beforeunload", alertUser);
    // };
  }, []);

  return (
    <Main className='main-section-gap'>
      <>
        <div className='top-btn-list'>
          <button
            type='submit'
            className='p-0'
            form='business apply'
          >
            <TopBtn
              icon={<Icons.Send />}
              primary
            >
              送簽表單
            </TopBtn>
          </button>
          <button
            type='button'
            className='p-0'
          >
            <TopBtn icon={<Icons.Send />}>暫存檔案</TopBtn>
          </button>
          <button
            type='button'
            className='p-0'
          >
            <TopBtn icon={<Icons.Send />}>附加文件</TopBtn>
          </button>
          <Link to={"../"}>
            <TopBtn icon={<Icons.Send />}>返回列表</TopBtn>
          </Link>
        </div>
        <Model name='newDetail'>
          <NewDetailForm />
        </Model>
        <Model name='review'>
          <h1>123</h1>
        </Model>
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
