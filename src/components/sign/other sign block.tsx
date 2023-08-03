import styled, { useTheme } from "styled-components";
import AsyncSelect from "react-select/async";
import { useOptions } from "@/hooks/options";
import * as Btns from "@components/UI/buttons";
import { Controller, useForm } from "react-hook-form";
import { Modal } from "@/layouts/modal";
import { ErrorsModal } from "../apply/add/errors";
import { useModalControl } from "@/hooks/modal control";
const OtherSignBlock = ({ className }: { className?: string }) => {
  const color = useTheme()?.color;
  const { options } = useOptions();

  const [toggleErrorModal] = useModalControl("errors");

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      member: [] as string[],
    },
  });

  function onSubmit<T>(d: T) {
    console.log(d);
  }

  return (
    <article className={`modal ${className} space-y-4`}>
      <Modal name='errors'>
        <ErrorsModal errors={errors} />
      </Modal>
      <h3>會簽人員</h3>
      <form
        id='otherSign'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='member'
          rules={{ required: "沒人" }}
          render={({ field: { onChange } }) => (
            <AsyncSelect
              loadOptions={options.a}
              defaultOptions
              cacheOptions
              menuIsOpen
              onChange={(d) => {
                const value: string[] = d.map((m) => m.EmpId);
                onChange(value);
              }}
              closeMenuOnSelect={false}
              isMulti
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
