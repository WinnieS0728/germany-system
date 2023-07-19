import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

const MySelect = (props: any) => {
  const { options, onChange } = props;
  function handleChange(e: any) {
    if (e) {
      onChange(e.value);
    }
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
    />
  );
};

export const QAQ = () => {
  console.count("render");
  const initValue = {
    text: "",
    select_A: "",
    select_B: "",
    select_C: "",
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: initValue,
  });

  const options_A = [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
    {
      label: "C",
      value: "C",
    },
  ];
  const options_B = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
  ];
  const options_C = [
    {
      label: "X",
      value: "X",
    },
    {
      label: "Y",
      value: "Y",
    },
    {
      label: "Z",
      value: "Z",
    },
  ];

  function onSubmit<T>(d: T) {
    console.log(d);
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initValue);
    }
  }, [initValue, isSubmitSuccessful, reset]);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onResetCapture={() => {
          reset(initValue);
        }}
      >
        <input
          type='text'
          autoComplete='off'
          {...register("text")}
        />
        <Controller
          control={control}
          name='select_A'
          render={({ field: { onChange } }) => (
            <MySelect
              options={options_A}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='select_B'
          render={({ field: { onChange } }) => (
            <MySelect
              options={options_B}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='select_C'
          render={({ field: { onChange } }) => (
            <MySelect
              options={options_C}
              onChange={onChange}
            />
          )}
        />
        <button type='reset'>reset</button>
        <button type='submit'>submit</button>
      </form>
    </>
  );
};
