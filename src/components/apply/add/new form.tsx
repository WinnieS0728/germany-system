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
import { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { Model } from "@/layouts/model";
import { TripDetailForm } from "./trip detail";

interface blockProp {
  children: JSX.Element;
  className?: string;
}
const Block = ({ children }: blockProp) => {
  return (
    <div className={`rounded-md px-8 py-4 ring-2 ring-gray-300`}>
      {children}
    </div>
  );
};
export const NewForm = () => {
  const color = useTheme()?.color;
  const methods = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      transportation: "",
      isStay: "false",
      stayDay: 0,
      money: "0",
      moneyType: "",
      agent: "",
    },
  });

  const [showModel, setModelShow] = useState<boolean>(false);

  function onSubmit<T>(d: T) {
    console.log(d);
  }

  
  //  TODO 預防重新整理
  // function alertUser(e: any) {
  //   e.preventDefault();
  //   e.returnValue = "";
  // }
  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);

  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

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
        <Model
          show={showModel}
          setShow={setModelShow}
        >
          <NewDetailForm />
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
            <div>
              <button
                type='button'
                className='p-0'
                onClick={() => {
                  setModelShow(true);
                }}
              >
                <TopBtn
                  style={{
                    backgroundColor: color.sectionHeader,
                    color: color.white,
                  }}
                  icon={<Icons.NewDetail />}
                >
                  新增出差計畫
                </TopBtn>
              </button>
            </div>
            <Block>
              <TripDetailForm />
            </Block>
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
      </>
    </Main>
  );
};
