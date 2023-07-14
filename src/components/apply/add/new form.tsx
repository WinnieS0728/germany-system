import { TopBtn } from "@/components/UI/buttons";
import { Main } from "@/layouts/main";
import * as Icons from "@components/UI/icons";
import { Link } from "react-router-dom";
import { InfoForm } from "./header";
import { TrafficForm } from "./trafic";
import { FormProvider, useForm } from "react-hook-form";
import { MoneyForm } from "./money";
import { AgentForm } from "./agent";
import { AttachForm } from "./attach";
import { useAppSelector } from "@/hooks/redux";

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
  const methods = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      traffic: "",
      isStay: "false",
      stayDay: 0,
      money: "0",
      moneyType: "",
    },
  });

  function onSubmit<T>(d: T) {
    console.log(d);
  }
  
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
              <TrafficForm />
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
