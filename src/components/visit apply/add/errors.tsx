import { useModalControl } from "@/hooks/modal control";
import * as Icons from "@components/UI/icons";
import { FieldError, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";

const ErrorsModal = ({ errors }: { errors: FieldErrors }) => {
  // console.log(errors);
  const { t } = useTranslation("errors");
  const color = useTheme()?.color;
  const errorMessage = (Object.values(errors) as FieldError[]).map(
    (err) => err.message
  );
  const tripError = getTripDataError();
  const [toggleModal] = useModalControl("errors");

  function getTripDataError() {
    if (Array.isArray(errors.tripData)) {
      const error = errors.tripData
        .map((i) => [i?.startDate?.message, i?.endDate?.message])
        .reduce((a: string[], b: string[]) => a.concat(b), [])
        .filter((i: string) => i !== undefined);
      return [...new Set(error)];
    } else {
      return [];
    }
  }
  return (
    <div
      style={{ backgroundColor: color.white }}
      className='modal'
    >
      <h2 className='border-b-4 py-4 text-center text-3xl'>{t("title")}</h2>
      <div className='flex'>
        <span
          style={{ fontSize: "10rem" }}
          className='hidden w-1/2 items-center justify-center sm:flex'
        >
          <Icons.Error />
        </span>
        <div className='flex w-full flex-col justify-center'>
          <ul className='error-ul py-4 ps-8 text-xl'>
            {errorMessage?.map((m, index) => (
              <li
                key={index}
                className='flex items-center gap-2'
              >
                <span className='sm:hidden'>
                  <Icons.Error />
                </span>
                {m}
              </li>
            ))}
            {tripError?.map((m: string, index) => (
              <li key={index}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          style={{ backgroundColor: color.sectionHeader, color: color.white }}
          onClick={() => {
            toggleModal("off");
          }}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default ErrorsModal