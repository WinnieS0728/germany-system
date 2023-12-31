import { useForm } from "react-hook-form";
import { Table } from "../table/table";
import { useEffect, useMemo, useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { Required } from "../form/required";
import { useModalControl } from "@/hooks/modal control";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@data/store";
import { DevTool } from "@hookform/devtools";
import { setErrors } from "@/data/reducers/error/errors";
import { useSign } from "@/hooks/useSign";
import { useFiles } from "@/hooks/useFiles";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { useEmail } from "@/hooks/useEmail";
import { cn } from "@/utils/cn";

export type SignData = {
  agree: "yes" | "no";
  password: string;
  opinion: string | undefined;
};

const SignBlock = ({
  className,
  type,
}: {
  className?: string;
  type: "sign" | "otherSign";
}) => {
  const { t } = useTranslation(["sign", "errors"]);
  const { formId, signList, nowOrder } = useAppSelector(
    (state) => state.formInfo
  ).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const { sign, updateFormStatus, signOver } = useSign();
  const [showPassword, setPasswordShow] = useState<boolean>(false);
  const { uploadFile } = useFiles();
  const { sendEmail } = useEmail();
  const dispatch = useAppDispatch();

  const isFinalSigner = useMemo<boolean>(() => {
    const nextSigner = signList.find(
      (member) => member.SIGNORDER === nowOrder + 1
    );
    if (!nextSigner) {
      return true;
    } else {
      return false;
    }
  }, [nowOrder, signList]);

  const [toggleModal] = useModalControl("sign");
  const [toggleErrorModal] = useModalControl("errors");

  const inputDisable = type === "sign" ? false : true;

  const signSchema = yup.object().shape({
    agree:
      type === "sign"
        ? yup.string().oneOf(["yes", "no"], t("sign.decide", { ns: "errors" }))
        : yup.string().notRequired(),
    password: yup
      .string()
      .required(t("sign.password", { ns: "errors" }))
      .test(
        "checkPassword",
        t("sign.wrong-psw", { ns: "errors" }),
        async function (value: string) {
          return await api.logIn(nowUser.EmpId, value);
        }
      ),
    opinion:
      type === "sign"
        ? yup.string().when("agree", {
            is: (value: string) => value === "no",
            then: () =>
              yup
                .string()
                .trim()
                .required(t("sign.sign-opinion", { ns: "errors" })),
            otherwise: () => yup.string().notRequired(),
          })
        : yup
            .string()
            .trim()
            .required(t("sign.otherSign-opinion", { ns: "errors" })),
  });

  const {
    handleSubmit,
    register,
    control,
    trigger,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    shouldUnregister: true,
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(signSchema),
    defaultValues: {
      agree: "",
      password: "",
      opinion: "",
    },
  });

  const watch_agree = watch("agree");

  useEffect(() => {
    if (type === "otherSign") {
      setValue("agree", "yes");
    }
  }, [setValue, type]);

  useEffect(() => {
    trigger();
  }, [trigger, watch_agree]);

  function onSubmit<T>(d: T) {
    // console.log(d);
    send(d as SignData);
    if ((d as { agree: "yes" | "no" }).agree === "no") {
      signOver();
    }
    toggleModal("off");
    reset();
  }

  async function send(data: SignData) {
    sign(data);
    uploadFile(formId);
    updateFormStatus(data.agree);
    if (data.agree === "no") {
      const recipient = signList[0].SIGNER;
      sendEmail(recipient, "return");
    } else if (data.agree === "yes" && isFinalSigner) {
      const recipient = signList[0].SIGNER;
      sendEmail(recipient, "done");
    } else {
      const recipient = signList[nowOrder + 1].SIGNER;
      sendEmail(recipient, "wait");
    }
  }

  function validation() {
    dispatch(setErrors(errors));
    if (!isValid) {
      toggleErrorModal("on");
    }
  }

  return (
    <article className={cn(`modal bg-myWhite`, className)}>
      <h3 className='text-center text-xl p-2 bg-sign_header'>{t("title")}</h3>
      <ul className='bg-sign_content p-4 reference_mark'>
        {type === "sign" ? (
          <li>{t("sign-warn")}</li>
        ) : (
          <li>{t("otherSign-warn")}</li>
        )}
      </ul>
      <form
        id='sign'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          toggleModal("off");
        }}
      >
        <Table className='mb-4'>
          <table>
            <tbody>
              <tr>
                <td
                  rowSpan={2}
                  className='bg-tableBgc'
                >
                  <span className='relative py-1'>
                    {type === "sign" && <Required />}
                    {t("label.decide")}
                  </span>
                </td>
                <td>
                  <label className='flex gap-2'>
                    <input
                      type='radio'
                      value={"yes"}
                      disabled={inputDisable}
                      {...register("agree")}
                    />
                    <p>{t("radio.yes")}</p>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='flex gap-2'>
                    <input
                      type='radio'
                      value={"no"}
                      disabled={inputDisable}
                      {...register("agree")}
                    />
                    <p>
                      {type === "sign"
                        ? t("radio.sign-no")
                        : t("radio.otherSign-no")}
                    </p>
                  </label>
                </td>
              </tr>
              <tr>
                <td className='bg-tableBgc'>
                  <label
                    htmlFor='sign-password'
                    className='relative py-1'
                  >
                    <span>
                      <Required />
                      {t("label.password")}
                    </span>
                  </label>
                </td>
                <td>
                  <div className='flex'>
                    <input
                      id='sign-password'
                      className='w-full'
                      type={showPassword ? "text" : "password"}
                      autoComplete='off'
                      {...register("password")}
                    />
                    <button
                      type='button'
                      onClick={() => {
                        setPasswordShow((prev) => !prev);
                      }}
                      className='p-2'
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <Icons.Password_show />
                      ) : (
                        <Icons.Password_hide />
                      )}
                    </button>{" "}
                  </div>
                </td>
              </tr>
              <tr>
                <td className='bg-tableBgc'>
                  <label
                    htmlFor='sign-opinion'
                    className='relative p-1'
                  >
                    {(watch_agree === "no" || type === "otherSign") && (
                      <Required />
                    )}
                    {t("label.opinion")}
                  </label>
                </td>
                <td>
                  <TextAreaAutosize
                    id='sign-opinion'
                    className='w-full'
                    {...register("opinion", {
                      setValueAs: (value: string) =>
                        value.split("\n").reduce((a, b) => `${a}${b}`),
                    })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Table>
        <div className='submit-btns'>
          <Btns.LongBtn
            type='submit'
            style='confirm'
            form='sign'
            onClick={validation}
          />
          <Btns.LongBtn
            type='reset'
            style='cancel'
            form='sign'
          />
        </div>
      </form>
      <DevTool control={control} />
    </article>
  );
};

export default SignBlock;
