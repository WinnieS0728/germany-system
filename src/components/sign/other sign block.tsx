import styled, { useTheme } from "styled-components";
import AsyncSelect from "react-select/async";
import { useOptions } from "@/hooks/options";
import * as Btns from "@components/UI/buttons";
import { Controller, useForm } from "react-hook-form";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch } from "@/hooks/redux";
import { setErrors } from "@/data/reducers/error/errors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useSelectRef } from "@/hooks/select ref";
import { useSign } from "@/hooks/sign";
import { useTranslation } from "react-i18next";
import { useId2name } from "@/hooks/id2name";
import { memberResType } from "@/lib/api/member/getMember";

const OtherSignBlock = ({ className }: { className?: string }) => {
  const color = useTheme()?.color;
  const { t } = useTranslation(["sign", "errors"]);
  const { options } = useOptions();
  const { otherSignRef } = useSelectRef();
  const { splitName } = useId2name();
  const dispatch = useAppDispatch();
  const { otherSign } = useSign();

  const [toggleErrorModal] = useModalControl("errors");
  const [toggleOtherSignModal] = useModalControl("otherSign");

  const schema = yup.object().shape({
    member: yup
      .array()
      .of(yup.string())
      .min(1, t("otherSign.noMember", { ns: "errors" })),
  });
  const {
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    criteriaMode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      member: [] as string[],
    },
  });

  function onSubmit<T>(d: T) {
    // console.log(d);
    send((d as { member: string[] }).member);
    toggleOtherSignModal("off");
    otherSignRef.current?.clearValue();
    reset();
  }

  async function send(list: string[]) {
    otherSign(list);
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <article className={`modal ${className} space-y-4`}>
      <h3>{t("otherSign.title", { ns: "sign" })}</h3>
      <form
        id='otherSign'
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          otherSignRef.current?.clearValue();
          toggleOtherSignModal("off");
        }}
      >
        <Controller
          control={control}
          name='member'
          render={({ field: { onChange } }) => (
            <AsyncSelect
              ref={otherSignRef as any}
              loadOptions={options.otherSign as (inputValue: string) => void}
              defaultOptions
              cacheOptions
              menuIsOpen
              onChange={(d) => {
                const value: string[] = d.map((m) => m.EmpId);
                onChange(value);
              }}
              closeMenuOnSelect={false}
              isMulti
              placeholder={t("otherSign.placeholder", { ns: "sign" })}
              hideSelectedOptions={false}
              getOptionLabel={(option: memberResType) => splitName(option)}
              getOptionValue={(option: memberResType) => option.EmpId}
              filterOption={(
                candidate: { data: memberResType },
                input: string
              ) => {
                if (input.startsWith("!")) {
                  return true;
                } else {
                  if (
                    candidate.data.FullName.toLowerCase().includes(
                      input.toLowerCase()
                    ) ||
                    candidate.data.EmpId.includes(input)
                  ) {
                    return true;
                  }
                  return false;
                }
              }}
              styles={{
                menu: (baseStyles) => ({
                  ...baseStyles,
                  position: "relative",
                }),
                menuList: (baseStyles) => ({
                  ...baseStyles,
                  maxHeight: "20rem",
                }),
                groupHeading: (baseStyles) => ({
                  ...baseStyles,
                  textAlign: "center",
                  backgroundColor: color.sectionHeader,
                  color: color.white,
                  paddingBlock: ".5rem",
                }),
                option: (baseStyles, { isSelected, isFocused }) => ({
                  ...baseStyles,
                  backgroundColor: isSelected
                    ? color.green
                    : isFocused
                    ? "#B2D4FF"
                    : undefined,
                  color: color.black,
                }),
                indicatorsContainer: (baseStyles) => ({
                  ...baseStyles,
                  display: "none",
                }),
              }}
            />
          )}
        />
      </form>
      <div className='submit-btns'>
        <Btns.LongBtn
          type='reset'
          style='cancel'
          form='otherSign'
        />
        <Btns.LongBtn
          type='submit'
          style='confirm'
          form='otherSign'
          onClick={() => {
            if (!isValid) {
              dispatch(setErrors(errors));
              toggleErrorModal("on");
            }
          }}
        />
      </div>
    </article>
  );
};

const styled_otherSign = styled(OtherSignBlock)`
    background-color: ${(props) => props.theme.color.white};

    h3{
        text-align: center;
        font-size: 1.25rem;
        padding: 0.5rem;
        background-color: ${(props) => props.theme.color.sign_header};
    }
`;

export default styled_otherSign;
