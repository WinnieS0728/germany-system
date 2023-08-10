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
import { DetailTable } from "@/components/apply/add/detail/detail table";
import { DetailHeaderBlock } from "@/components/apply/sign/detail header";
import { PerCentTable } from "@/components/apply/add/confirm/percent table";
import { useTableData } from "./table data";
import { WeekTable } from "@/components/apply/add/confirm/week tabel";
import { useModalControl } from "@/hooks/modal control";
import { SignTable } from "@/components/sign/sign table";
import { AttachForm } from "@/components/apply/add/attach";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useMemo, useState } from "react";
import { nextSign, setFormId } from "@/data/reducers/sign/form info";
import { setSignList } from "@/data/actions/sign/set sign list";
import { setNextSigner } from "@/data/actions/sign/set next sign";
import { setFormAttach } from "@/data/actions/files/fetch form attach";
import api from "@/lib/api";
import { Modal } from "@/layouts/modal";
import { UploadFiles } from "@/components/apply/add/upload files";
import { SignBlock } from "@/components/sign/sign box";
import { OtherSignBlock } from "@/components/sign/other sign block";
import { ErrorsModal } from "@/components/apply/add/errors";
import { Hamburger } from "@/layouts/hamberger";

const SignPage = () => {
  const { formId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFormId(formId));
    dispatch(setSignList(formId as string));
    dispatch(setNextSigner(formId as string));
    dispatch(setFormAttach(formId as string));
  }, [dispatch, formId]);
  const formInfo = useAppSelector((state) => state.formInfo).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;

  const color = useTheme()?.color;
  const methods = useForm();

  const isNextSigner = useMemo(() => {
    if ((formInfo.nextSign as nextSign)?.SIGNER === nowUser.EmpId) {
      return true;
    }
    return false;
  }, [formInfo, nowUser]);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    (async function () {
      const res = await api.getMemberGroup(nowUser.EmpId);
      if (res.find((i: { GroupID: string }) => i.GroupID === "admin")) {
        setIsAdmin(true);
      }
    })();
  }, [nowUser]);

  const { headData, detailData } = useSignPageData(formId as string);
  // console.log(detailData);

  const tableData = useTableData(detailData, headData.createDate);

  const totalData = detailData
    .reduce((a, b) => a.concat(b), [])
    .sort((a, b) => timeSort(a.date) - timeSort(b.date));

  function timeSort(date: string[]): number {
    return new Date(date[0]).getTime();
  }

  const tripTime = {
    year: totalData[0]?.date[0].split("-")[0],
    month: totalData[0]?.date[0].split("-")[1],
  };

  const [toggleSignModal] = useModalControl("sign");
  const [toggleOtherSignModal] = useModalControl("otherSign");
  const [toggleFileModal] = useModalControl("files");

  const myErrors = useAppSelector((state) => state.errors);

  return (
    <>
      {isNextSigner && (
        <>
          <Modal name='files'>
            <UploadFiles />
          </Modal>
          <Modal name='sign'>
            <SignBlock type='sign' />
          </Modal>
          <Modal name='otherSign'>
            <OtherSignBlock />
          </Modal>
        </>
      )}
      <Modal name='errors'>
        <ErrorsModal errors={myErrors.body} />
      </Modal>
      <Header title='國內外出差申請單' />
      <Main className='main-section-gap'>
        <>
          <div className='top-btn-list'>
            {isNextSigner && (
              <>
                <Hamburger
                  list={[
                    <button
                      type='button'
                      onClick={() => {
                        toggleSignModal("on");
                      }}
                    >
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
                    </button>,
                    <button
                      type='button'
                      onClick={() => {
                        toggleOtherSignModal("on");
                      }}
                    >
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
                    </button>,
                    <button
                      type='button'
                      onClick={() => {
                        toggleFileModal("on");
                      }}
                    >
                      <Btns.IconBtn icon={<Icons.AddFiles size='1.5rem' />}>
                        加入附件
                      </Btns.IconBtn>
                    </button>,
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
                    </button>,
                  ]}
                />
              </>
            )}
            <button type='button'>
              <Link to={"https://esys.orange-electronic.com/Eform/List"}>
                <Btns.IconBtn icon={<Icons.Back size='1.25rem' />}>
                  返回列表
                </Btns.IconBtn>
              </Link>
            </button>
            {isAdmin && (
              <button type='button'>
                <Btns.IconBtn icon={<Icons.Void size='1.25rem' />}>
                  作廢
                </Btns.IconBtn>
              </button>
            )}
          </div>
          <FormProvider {...methods}>
            <Block>
              <InfoForm
                type='sign'
                data={headData}
              />
            </Block>
            <Block>
              <TransportationBlock data={headData} />
            </Block>
            <Block>
              <div className='space-y-4'>
                <WeekTable data={tableData} />
                <PerCentTable
                  data={detailData}
                  EmpId={headData.EmpId}
                  time={tripTime}
                />
              </div>
            </Block>
            {detailData.map((data, index) => (
              <Block key={index}>
                <Collapse
                  type='sign'
                  main={<DetailHeaderBlock data={data} />}
                  sub={
                    <DetailTable
                      type='sign'
                      data={data}
                      index={index}
                    />
                  }
                />
              </Block>
            ))}
            <Block>
              <p>預支差旅費 : {headData.money}</p>
            </Block>
            <Block>
              <p>代理人 : {headData.agent}</p>
            </Block>
            <Block>
              <AttachForm type='sign' />
            </Block>
          </FormProvider>
          <SignTable />
        </>
      </Main>
    </>
  );
};

export default SignPage;
