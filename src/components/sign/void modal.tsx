import { useTheme } from "styled-components";
import * as Btns from "@components/UI/buttons";
import { useModalControl } from "@/hooks/modal control";
import { useSign } from "@/hooks/sign";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/redux";

const VoidModal = () => {
  const color = useTheme()?.color;
  const { t } = useTranslation("sign");
  const [toggleModal] = useModalControl("void");
  const formInfo = useAppSelector((state) => state.formInfo).body;

  const { updateFormStatus } = useSign();

  return (
    <article
      className='modal space-y-4'
      style={{ backgroundColor: color.white }}
    >
      <h2 className='border-b-4 py-4 text-center text-3xl'>
        {t("void-title")}
        {` ${formInfo.formId}`}
      </h2>
      <div className='submit-btns'>
        <Btns.LongBtn
          type='button'
          style='cancel'
          onClick={() => {
            toggleModal("off");
          }}
        />
        <Btns.LongBtn
          type='button'
          style='confirm'
          onClick={() => {
            updateFormStatus("delete");
            toggleModal("off");
          }}
        />
      </div>
    </article>
  );
};

export default VoidModal