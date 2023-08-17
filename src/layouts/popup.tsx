import { ErrorsModal } from "@/components/apply/add/errors";
import { Modal } from "./modal";
import { NewDetailForm } from "@/components/apply/add/detail/new detail";
import { Confirm } from "@/components/apply/add/confirm/confirm";
import { UploadFiles } from "@/components/apply/add/upload files";
import { useAppSelector } from "@/hooks/redux";
import { useModalControl } from "@/hooks/modal control";
import { useScroll } from "@/hooks/scroll control";
import { OtherSignBlock } from "@/components/sign/other sign block";
import { SignBlock } from "@/components/sign/sign box";
import { useEffect, useState } from "react";
import { nextSign } from "@/data/reducers/sign/form info";
import { VoidModal } from "@/components/sign/void modal";

type signType = "sign" | "otherSign";

export const PopupLayer = () => {
  const errors = useAppSelector((state) => state.errors);
  const formInfo = useAppSelector((state) => state.formInfo).body;

  const errorsState = useModalControl("errors")[1];
  const detailState = useModalControl("newDetail")[1];
  const reviewState = useModalControl("review")[1];
  const filesState = useModalControl("files")[1];
  const signState = useModalControl("sign")[1];
  const otherSignState = useModalControl("otherSign")[1];
  const voidState = useModalControl("void")[1];

  const modalStatusArray = [
    errorsState,
    detailState,
    reviewState,
    filesState,
    signState,
    otherSignState,
    voidState,
  ];

  const { canScroll } = useScroll();
  if (modalStatusArray.some((status) => status === true)) {
    canScroll(false);
  } else {
    canScroll(true);
  }

  return (
    <>
      {detailState && (
        <Modal name='newDetail'>
          <NewDetailForm />
        </Modal>
      )}
      {reviewState && (
        <Modal name='review'>
          <Confirm />
        </Modal>
      )}
      {filesState && (
        <Modal name='files'>
          <UploadFiles />
        </Modal>
      )}
      {signState && (
        <Modal name='sign'>
          <SignBlock type={formInfo.signType} />
        </Modal>
      )}
      {otherSignState && (
        <Modal name='otherSign'>
          <OtherSignBlock />
        </Modal>
      )}
      {voidState && (
        <Modal name='void'>
          <VoidModal />
        </Modal>
      )}
      {errorsState && (
        <Modal name='errors'>
          <ErrorsModal errors={errors.body} />
        </Modal>
      )}
    </>
  );
};
