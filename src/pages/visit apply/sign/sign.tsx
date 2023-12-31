import * as Btns from "@/components/UI/buttons";
import { InfoForm } from "@/components/visit apply/add/info form";
import { Block } from "@/layouts/block";
import { Main } from "@/layouts/main";
import * as Icons from "@components/UI/icons";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { useSignPageData } from "./data";
import { TransportationBlock } from "@/components/visit apply/sign/transport";
import { Collapse } from "@/layouts/collapse";
import { DetailTable } from "@/components/visit apply/add/detail/detail table";
import { DetailHeaderBlock } from "@/components/visit apply/sign/detail header";
import { PerCentTable } from "@/components/visit apply/add/confirm/percent table";
import { useTableData } from "./table data";
import { WeekTable } from "@/components/visit apply/add/confirm/week tabel";
import { useModalControl } from "@/hooks/modal control";
import { SignTable } from "@/components/sign/sign table";
import { AttachForm } from "@/components/visit apply/add/attach";
import { useAppDispatch, useAppSelector } from "@data/store";
import { useEffect, useMemo, useState } from "react";
import { nextSign, setFormId } from "@/data/reducers/sign/form info";
import { setSignList } from "@/data/actions/sign/set sign list";
import { setNextSigner } from "@/data/actions/sign/set next sign";
import { setFormAttach } from "@/data/actions/files/fetch form attach";
import api from "@/api";
import { Hamburger } from "@/layouts/hamburger";
import { useTranslation } from "react-i18next";
import { PopupLayer } from "@/layouts/popup";

export default function SignPage() {
  const { formId } = useParams();
  const { t } = useTranslation(["common", "sign page", "new form"]);
  const { signList, nextSign } = useAppSelector((state) => state.formInfo).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const color = useTheme()?.color;
  const methods = useForm();
  const dispatch = useAppDispatch();
  const { headData, detailData } = useSignPageData();
  const tableData = useTableData(detailData, headData.createDate);

  const [toggleVoidModal] = useModalControl("void");
  const [toggleSignModal] = useModalControl("sign");
  const [toggleOtherSignModal] = useModalControl("otherSign");
  const [toggleFileModal] = useModalControl("files");

  const isInSignList = useMemo<boolean>(() => {
    if (signList.some((member) => member.SIGNER === nowUser.EmpId)) {
      return true;
    } else {
      return false;
    }
  }, [signList, nowUser.EmpId]);
  const isNextSigner = useMemo<boolean>(() => {
    if ((nextSign as nextSign)?.SIGNER === nowUser.EmpId) {
      return true;
    }
    return false;
  }, [nextSign, nowUser.EmpId]);
  const isVoid = useMemo<boolean>(() => {
    if (headData.status === "作廢") {
      return true;
    }
    return false;
  }, [headData.status]);

  useEffect(() => {
    (async function () {
      const res = await api.getMemberGroup(nowUser.EmpId);
      if (res.find((i: { GroupID: string }) => i.GroupID === "admin")) {
        setIsAdmin(true);
      }
    })();
  }, [nowUser]);

  useEffect(() => {
    dispatch(setFormId(formId));
    dispatch(setSignList(formId as string));
    dispatch(setNextSigner(formId as string));
    dispatch(setFormAttach(formId as string));
  }, [dispatch, formId]);

  function timeSort(date: string[]): number {
    return new Date(date[0]).getTime();
  }

  const totalData = detailData
    .reduce((a, b) => a.concat(b), [])
    .sort((a, b) => timeSort(a.date) - timeSort(b.date));

  const tripTime = {
    year: totalData[0]?.date[0]?.split("-")[0],
    month: totalData[0]?.date[0]?.split("-")[1],
  };

  const printPageSrc = location.href.split("#")[1].replace("sign", "print");

  return (
    <>
      <PopupLayer />
      <Main className='main-section-gap'>
        <>
          <div className='top-btn-list'>
            {isNextSigner && !isVoid && (
              <Hamburger>
                <>
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
                      {t("btn.sign", { ns: "sign page" })}
                    </Btns.IconBtn>
                  </button>
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
                      {t("btn.otherSign", { ns: "sign page" })}
                    </Btns.IconBtn>
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      toggleFileModal("on");
                    }}
                  >
                    <Btns.IconBtn icon={<Icons.AddFiles size='1.5rem' />}>
                      {t("btn.attach", { ns: "sign page" })}
                    </Btns.IconBtn>
                  </button>
                  <button type='button'>
                    <Link
                      to={`../print/${formId}?userID=${nowUser.EmpId}`}
                      target='_blank'
                    >
                      <Btns.IconBtn
                        icon={
                          <Icons.Print
                            size='1.5rem'
                            color={color.black}
                          />
                        }
                      >
                        {t("btn.print", { ns: "sign page" })}
                      </Btns.IconBtn>
                    </Link>
                  </button>
                </>
              </Hamburger>
            )}
            {isInSignList && !isNextSigner && (
              <button type='button'>
                <Link
                  to={printPageSrc}
                  target='_blank'
                >
                  <Btns.IconBtn
                    icon={
                      <Icons.Print
                        size='1.5rem'
                        color={color.black}
                      />
                    }
                  >
                    {t("btn.print", { ns: "sign page" })}
                  </Btns.IconBtn>
                </Link>
              </button>
            )}
            <button type='button'>
              <Link to={`/visitApply`}>
                <Btns.IconBtn icon={<Icons.Back size='1.25rem' />}>
                  {t("btn.back", { ns: "sign page" })}
                </Btns.IconBtn>
              </Link>
            </button>
            {isAdmin && !isVoid && (
              <>
                <button
                  type='button'
                  onClick={() => {
                    toggleVoidModal("on");
                  }}
                >
                  <Btns.IconBtn icon={<Icons.Void size='1.25rem' />}>
                    {t("btn.void", { ns: "sign page" })}
                  </Btns.IconBtn>
                </button>
              </>
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
              <p>
                {t("money.amount", { ns: "new form" })} : {headData.money}
              </p>
            </Block>
            <Block>
              <p>
                {t("deputy.deputy", { ns: "new form" })} : {headData.agent}
              </p>
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
}
