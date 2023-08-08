import { useForm, useWatch } from "react-hook-form";
import { Table } from "../table/table";
import styled from "styled-components";
import { useEffect, useState } from "react";
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
import { signFinalDataType } from "@/lib/api/sign/update sign";

const SignBlock = ({
  className,
  type,
}: {
  className?: string;
  type: "sign" | "otherSign";
}) => {
  const formInfo = useAppSelector((state) => state.formInfo).body;
  const nowUser = useAppSelector((state) => state.nowUser);
  const fileData = useAppSelector((state) => state.files).body;

  const signSchema = yup.object().shape({
    agree:
      type === "sign"
        ? yup.string().oneOf(["yes", "no"], "沒決定欸")
        : yup.string().notRequired(),
    password: yup.string().required("沒密碼"),
    // .test("checkPassword", "密碼錯誤", async function (value: string) {
    //   return await api.logIn(nowUser.body.EmpId, value);
    // })
    opinion:
      type === "sign"
        ? yup.string().when("agree", {
            is: (value: string) => value === "no",
            then: () => yup.string().trim().required("意見必填"),
            otherwise: () => yup.string().notRequired(),
          })
        : yup.string().trim().required("意見必填"),
  });

  type data = {
    agree: "yes" | "no";
    password: string;
    opinion: string | undefined;
  };

  const {
    handleSubmit,
    register,
    control,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    shouldUnregister: true,
    mode: "all",
    criteriaMode: "all",
    // resolver: yupResolver(signSchema),
    reValidateMode: "onChange",
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
    send(d as data);
    toggleModal("off");
    reset();
  }

  async function send(data: data) {
    const a: signFinalDataType = {
      ...(formInfo.nextSign as {
        FORMNO: string;
        SIGNORDER: number;
        STEPNAME: string;
        SIGNER: string;
        SIGNERNAME: string;
        ALLOWCUSTOM: boolean;
        SignGroup: string;
        ISEnable: string;
        Status: string;
      }),
      ACTUALNAME: nowUser.body.EmpName,
      ACTUALSIGNER: nowUser.body.EmpId,
      SIGNRESULT: getSignNumber(data.agree),
      OPINION: data.opinion as string,
      SIGNTIME: "",
      types: "1",
      ExceId: nowUser.body.EmpId,
    };
    const res = await api.updateSignStatus(a);
    console.log(res);
    if (data.agree === "no") {
      // ? 退簽更新
      const data = {
        BTPId: formInfo.formId,
        Status: "3",
        type: "1",
      };
      const res = api.updateForm(data);
    }

    postFile(formInfo.formId);
  }

  async function postFile(id: string) {
    for (const file of fileData) {
      const filePackage = new FormData();
      filePackage.append("formId", id);
      filePackage.append("EmpId", nowUser.body.EmpId);
      filePackage.append("fileName", file.name);
      filePackage.append("webName", "BusinessTrip");
      filePackage.append("SIGNORDER", formInfo.nowOrder.toString());
      filePackage.append("file", file);
      const res = await api.uploadFileSign(filePackage);
    }
  }

  function getSignNumber(value: string) {
    if (value === "yes") {
      return 1;
    }
    if (value === "no") {
      return 3;
    }
    return 0;
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
        <div className='flex items-center justify-center gap-4'>
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
