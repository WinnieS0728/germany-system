import { useTheme } from "styled-components";
import * as Btns from "@components/UI/buttons";
import { useModalControl } from "@/hooks/modal control";
import { useSign } from "@/hooks/sign";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@data/store";
import { useEmail } from "@/hooks/email";

const VoidModal = () => {
  const color = useTheme()?.color;
  const { t } = useTranslation("sign");
  const [toggleModal] = useModalControl("void");
  const { formId, signList } = useAppSelector((state) => state.formInfo).body;

  const { updateFormStatus } = useSign();
  const { sendEmail } = useEmail();

  const recipient = signList[0].SIGNER;

  return (
    <article
      className='modal space-y-4'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='border-b-4 py-4 text-center text-3xl'>
        {t("void-title")}
        {` ${formId}`}
      </h2>
      <div className='submit-btns'>
        <Btns.LongBtn
          type='button'
          style='confirm'
          onClick={() => {
            sendEmail(recipient, "void");
            updateFormStatus("delete");
            toggleModal("off");
          }}
        />
        <Btns.LongBtn
          type='button'
          style='cancel'
          onClick={() => {
            toggleModal("off");
          }}
        />
      </div>
    </article>
  );
};

export default VoidModal;
