import { Controller, useForm, useWatch } from "react-hook-form";
import { Table } from "../table/table";
import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { Required } from "../form/required";
import { useModalControl } from "@/hooks/modal control";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { DevTool } from "@hookform/devtools";
import { setErrors } from "@/data/reducers/error/errors";
import api from "@/lib/api";
import { useSign } from "@/hooks/sign";
import { useFiles } from "@/hooks/files";

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
  const formInfo = useAppSelector((state) => state.formInfo).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;

  const signSchema = yup.object().shape({
    agree:
      type === "sign"
        ? yup.string().oneOf(["yes", "no"], "沒決定欸")
        : yup.string().notRequired(),
    password: yup
      .string()
      .required("沒密碼"),
      // TODO 密碼審核
      // .test("checkPassword", "密碼錯誤", async function (value: string) {
      //   return await api.logIn(nowUser.EmpId, value);
      // }),
    opinion:
      type === "sign"
        ? yup.string().when("agree", {
            is: (value: string) => value === "no",
            then: () => yup.string().trim().required("意見必填"),
            otherwise: () => yup.string().notRequired(),
          })
        : yup.string().trim().required("意見必填"),
  });

  const {
    handleSubmit,
    register,
    control,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    shouldUnregister: true,
    mode: "onSubmit",
    criteriaMode: "all",
    resolver: yupResolver(signSchema),
    defaultValues: {
      agree: "",
      password: "",
      opinion: "",
    },
  });
  const [showPassword, setPasswordShow] = useState<boolean>(false);
  const inputDisable = type === "sign" ? false : true;
  function onSubmit<T>(d: T) {
    // console.log(d);
    send(d as SignData);
    toggleModal("off");
    reset();
  }

  const { sign, updateFormStatus } = useSign();
  const { uploadFile } = useFiles();

  async function send(data: SignData) {
    sign(data);
    updateFormStatus(data.agree);
    uploadFile(formInfo.formId);
  }

  const dispatch = useAppDispatch();

  const watch_agree = useWatch({
    name: "agree",
    control,
  });  

  const [toggleModal] = useModalControl("sign");
  const [toggleErrorModal] = useModalControl("errors");

  useEffect(() => {
    trigger();
  }, [trigger, watch_agree]);

  function validation() {
    dispatch(setErrors(errors));
    if (!isValid) {
      toggleErrorModal("on");
    }
  }

  return (
    <article className={`modal ${className}`}>
      <h3>表單簽核</h3>
      <ul className='ref-ul'>
        {type === "sign" ? (
          <li>簽核選擇不同意, 請填寫意見 !</li>
        ) : (
          <li>會簽只需填寫意見, 無需選擇是否同意 !</li>
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
                  className='title'
                >
                  <span className='relative py-1'>
                    {type === "sign" && <Required />}
                    簽核決定
                  </span>
                </td>
                <td>
                  <label>
                    <input
                      type='radio'
                      value={"yes"}
                      disabled={inputDisable}
                      {...register("agree")}
                    />
                    同意
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <input
                      type='radio'
                      value={"no"}
                      disabled={inputDisable}
                      {...register("agree")}
                    />
                    {type === "sign" ? "不同意, 請填寫意見" : "不同意"}
                  </label>
                </td>
              </tr>
              <tr>
                <td className='title'>
                  <span className='relative py-1'>
                    <Required />
                    簽核密碼
                  </span>
                </td>
                <td>
                  <div className='flex'>
                    <input
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
                <td className='title'>
                  <span className='relative p-1'>
                    {(watch_agree === "no" || type === "otherSign") && (
                      <Required />
                    )}
                    簽核意見
                  </span>
                </td>
                <td>
                  <TextAreaAutosize
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
            type='reset'
            style='cancel'
            form='sign'
          />
          <Btns.LongBtn
            type='submit'
            style='confirm'
            form='sign'
            onClick={validation}
          />
        </div>
      </form>
      <DevTool control={control} />
    </article>
  );
};

const styled_sign = styled(SignBlock)`
    background-color: ${(props) => props.theme.color.white};
    h3{
        text-align: center;
        font-size: 1.25rem;
        padding: 0.5rem;
        background-color: ${(props) => props.theme.color.sign_header};
    }
    .ref-ul{
        background-color: ${(props) => props.theme.color.sign_content};
        padding: 1rem;
    }
    .title{
        background-color: ${(props) => props.theme.color.tableBgc};
    }
    td:not(.title){
        text-align: start;
    }
    label {
        display: flex;
        align-items: center;
        gap: 1rem;

        input[type='radio']{
            border-radius: 50%;
            border: 10px solid red;
        }
    }
`;

export { styled_sign as SignBlock };
