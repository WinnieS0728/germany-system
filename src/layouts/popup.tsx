import { ErrorsModal } from "@/components/apply/add/errors";
import { Modal } from "./modal";
import { NewDetailForm } from "@/components/apply/add/detail/new detail";
import { Confirm } from "@/components/apply/add/confirm/confirm";
import { UploadFiles } from "@/components/apply/add/upload files";
import { useAppSelector } from "@/hooks/redux";
import { useModalControl } from "@/hooks/modal control";
import { useScroll } from "@/hooks/scroll control";
import { SignBlock } from "@/components/sign/sign box";
import { OtherSignBlock } from "@/components/sign/other sign block";

export const PopupLayer = () => {
  const errors = useAppSelector((state) => state.errors);

  const errorsState = useModalControl("errors")[1];
  const detailState = useModalControl("newDetail")[1];
  const reviewState = useModalControl("review")[1];
  const filesState = useModalControl("files")[1];

  const statusArray = [errorsState, detailState, reviewState, filesState];

  const { canScroll } = useScroll();
  if (statusArray.some((status) => status === true)) {
    canScroll(false);
  } else {
    canScroll(true);
  }

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
      <Modal name='sign'>
        <SignBlock type='sign' />
      </Modal>
      <Modal name='otherSign'>
        <OtherSignBlock />
      </Modal>
      <Modal name='errors'>
        <ErrorsModal errors={errors.body} />
      </Modal>
    </>
  );
};
