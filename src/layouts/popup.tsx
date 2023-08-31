import { Modal } from "./modal";
import { useAppSelector } from "@/hooks/redux";
import { useModalControl } from "@/hooks/modal control";
import { useScroll } from "@/hooks/scroll control";
import { Suspense, lazy } from "react";

const NewDetailForm = lazy(
  () => import("@/components/apply/add/detail/new detail")
);
const Confirm = lazy(() => import("@/components/apply/add/confirm/confirm"));
const UploadFiles = lazy(() => import("@/components/apply/add/upload files"));
const SignBlock = lazy(() => import("@/components/sign/sign box"));
const OtherSignBlock = lazy(() => import("@/components/sign/other sign block"));
const VoidModal = lazy(() => import("@/components/sign/void modal"));
const ErrorsModal = lazy(() => import("@/components/apply/add/errors"));

export const PopupLayer = () => {
  const errors = useAppSelector((state) => state.errors);
  const { signType } = useAppSelector((state) => state.formInfo).body;

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
    <Suspense>
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
          <SignBlock type={signType} />
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
    </Suspense>
  );
};
