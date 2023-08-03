import { useForm, useWatch } from "react-hook-form";
import { Table } from "../table/table";
import styled, { useTheme } from "styled-components";
import { useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import * as Btns from "@components/UI/buttons";
import * as Icons from "@components/UI/icons";
import { Required } from "../form/required";
import { useModalControl } from "@/hooks/modal control";

const SignBlock = ({
  className,
  type,
}: {
  className?: string;
  type: "sign" | "otherSign";
}) => {
  const { handleSubmit, register, control } = useForm({
    shouldUnregister: true,
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      agree: "",
      password: "",
      opinion: "",
    },
  });
  const [showPassword, setPasswordShow] = useState<boolean>(false);
  const inputDisable = type === "sign" ? false : true;
  function onSubmit<T>(d: T) {
    console.log(d);
    toggleModal("off");
  }

  const watch_agree = useWatch({
    name: "agree",
    control,
  });

  const [toggleModal] = useModalControl("sign");

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
          />
        </div>
      </form>
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
