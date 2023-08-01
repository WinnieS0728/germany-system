import * as Btns from "@/components/UI/buttons";
import { InfoForm } from "@/components/apply/add/info form";
import { Block } from "@/layouts/block";
import { Header } from "@/layouts/header";
import { Main } from "@/layouts/main";
import * as Icons from "@components/UI/icons";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { useSignPageData } from "./data";
import { TransportationBlock } from "@/components/apply/sign/transport";
import { Collapse } from "@/layouts/collapse";
import { DetailHeader } from "@/components/apply/add/detail/detail header";
import { DetailTable } from "@/components/apply/add/detail/detail table";

export const SignPage = () => {
  const { formId } = useParams();
  const color = useTheme()?.color;
  const methods = useForm();

  const data = useSignPageData(formId as string);

  return (
    <>
      <Header title='國內外出差申請單' />
      <Main className='main-section-gap'>
        <>
          <div className='top-btn-list'>
            <button type='button'>
              <Btns.IconBtn
                icon={
                  <Icons.Sign
                    size='1.5rem'
                    color={color.white}
                  />
                }
                primary
              >
                簽核表單
              </Btns.IconBtn>
            </button>
            <button type='button'>
              <Btns.IconBtn
                icon={
                  <Icons.OtherSign
                    size='1.5rem'
                    color={color.white}
                  />
                }
                primary
              >
                會簽(意見徵詢)
              </Btns.IconBtn>
            </button>
            <button type='button'>
              <Btns.IconBtn icon={<Icons.AddFiles size='1.5rem' />}>
                加入附件
              </Btns.IconBtn>
            </button>
            <button type='button'>
              <Btns.IconBtn
                icon={
                  <Icons.Print
                    size='1.5rem'
                    color={color.black}
                  />
                }
              >
                列印
              </Btns.IconBtn>
            </button>
            <button type='button'>
              <Link to={"https://esys.orange-electronic.com/Eform/List"}>
                <Btns.IconBtn icon={<Icons.Back size='1.25rem' />}>
                  返回列表
                </Btns.IconBtn>
              </Link>
            </button>
          </div>
          <FormProvider {...methods}>
            <Block>
              <InfoForm
                type='sign'
                data={data}
              />
            </Block>
            <Block>
              <TransportationBlock data={data} />
            </Block>
            <Block>
              <Collapse
                type='sign'
                main={
                  <DetailHeader
                    data={[]}
                    index={1}
                  />
                }
                sub={
                  <DetailTable
                    data={[]}
                    index={1}
                  />
                }
                index={1}
              />
            </Block>
            <Block>
              <p>預支差旅費 : {data.money}</p>
            </Block>
            <Block>
              <p>代理人 : {data.agent}</p>
            </Block>
            <Block>
              <p>表單附件 : </p>
            </Block>
          </FormProvider>
        </>
      </Main>
    </>
  );
};
