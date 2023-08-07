import styled, { useTheme } from "styled-components";
import AsyncSelect from "react-select/async";
import { useOptions } from "@/hooks/options";
import * as Btns from "@components/UI/buttons";
import { Controller, useForm } from "react-hook-form";
import { useModalControl } from "@/hooks/modal control";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setErrors } from "@/data/reducers/error/errors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useSelectRef } from "@/hooks/select ref";
import api from "@/lib/api";
import { otherSignFinalDataType } from "@/lib/api/sign/post otherSign";

const schema = yup.object().shape({
  member: yup.array().of(yup.string()).min(1, "沒人"),
});

const OtherSignBlock = ({ className }: { className?: string }) => {
  const color = useTheme()?.color;
  const { options } = useOptions();

  const [toggleErrorModal] = useModalControl("errors");
  const [toggleOtherSignModal] = useModalControl("otherSign");

  const formInfo = useAppSelector((state) => state.formInfo);

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

  const dispatch = useAppDispatch();

  function onSubmit<T>(d: T) {
    // console.log(d);
    send((d as { member: string[] }).member);
    toggleOtherSignModal("off");
    reset();
    otherSignRef.current?.clearValue();
  }

  async function send(list: string[]) {
    const otherSignMember = await Promise.all(
      list.map(async (id: string) => (await api.getMember(id))[0])
    );
    const otherSignMemberList = otherSignMember.map(
      (member):otherSignFinalDataType => {
        return {
          FORMNO: formInfo.body.formId,
          SIGNORDER: formInfo.body.nowOrder,
          STEPNAME: member.DeptName,
          SIGNER: member.EmpId,
          SIGNERNAME: member.EmpName,
          OPINION: "",
          SignGroup: "會簽",
        };
      }
    );

    const res = api.postOtherSign(otherSignMemberList);
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

  const { otherSignRef } = useSelectRef();

  return (
    <article className={`modal ${className} space-y-4`}>
      <h3>會簽人員</h3>
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
              ref={otherSignRef}
              loadOptions={options.a}
              defaultOptions
              cacheOptions
              menuIsOpen
              onChange={(d) => {
                const value: string[] = (d as any[]).map((m) => m.EmpId);
                onChange(value);
              }}
              closeMenuOnSelect={false}
              isMulti
              placeholder={"請選擇人員..."}
              hideSelectedOptions={false}
              getOptionLabel={(option: any) => option.EmpName}
              getOptionValue={(option: any) => option.EmpId}
              filterOption={(candidate: any, input: string) => {
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
      <div className='flex items-center justify-center gap-4'>
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

export { styled_otherSign as OtherSignBlock };
