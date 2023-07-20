import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const MySelect = (props: any) => {
  const { options, onChange, label, value, filter } = props;
  function handleChange(e: any) {
    console.log(e);

    // if (e) {
    onChange(e[value] || e.value);
    // }
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      getOptionLabel={(option) => option[label] || option.label}
      getOptionValue={(option) => option[value] || option.value}
      filterOption={(option) => {
        if (!filter) {
          return true;
        }
        if (option.data.group === filter) {
          return true;
        }
        return false;
      }}
    />
  );
};
const initValue = {
  text: "",
  select_A: "",
  select_B: "",
  select_C: "",
  select_D: "",
  select_E: "",
};

export const QAQ = () => {
  console.count("render");

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

  const options = [
    { label: "a", name: "a", id: "001", group: "x" },
    { label: "a", name: "b", id: "002", group: "x" },
    { label: "a", name: "c", id: "003", group: "x" },
    { label: "a", name: "d", id: "004", group: "y" },
    { label: "a", name: "e", id: "005", group: "y" },
    { label: "a", name: "f", id: "006", group: "z" },
    { label: "a", name: "g", id: "007", group: "z" },
    { label: "a", name: "h", id: "008", group: "z" },
    { label: "a", name: "i", id: "009", group: "z" },
    { label: "a", name: "j", id: "010", group: "z" },
  ];

  function onSubmit<T>(d: T) {
    console.log(d);
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const [ss, setA] = useState("");

  const asyncFilterOption = (input: string, options: any[]) => {
    return options.filter((i) =>
      i.name.toLowerCase().includes(input.toLowerCase())
    );
  };
  const o = [
    { name: "a", id: 1, dept: "a" },
    { name: "b", id: 2, dept: "a" },
    { name: "c", id: 3, dept: "b" },
    { name: "d", id: 4, dept: "b" },
  ];
  async function getAsyncOptions(input: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(asyncFilterOption(input, o));
      }, 3000);
    });
  }

  const [gg, setGG] = useState("a");
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onResetCapture={() => {
          reset();
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
        <Controller
          control={control}
          name='select_D'
          render={({ field: { onChange } }) => (
            <MySelect
              options={options}
              onChange={onChange}
              label={"name"}
              value={"id"}
              filter={ss}
            />
          )}
        />
        <Controller
          control={control}
          name='select_E'
          render={({ field: { onChange } }) => (
            <AsyncSelect
              onChange={(e: any) => onChange(e)}
              defaultOptions
              cacheOptions
              loadOptions={getAsyncOptions as any}
              getOptionLabel={(option: { name: string }) => option.name}
              getOptionValue={(option: any) => option.id}
              filterOption={(candidate) => {
                return candidate.data.dept === gg;
              }}
            />
          )}
        />
        <button
          type='button'
          onClick={() => {
            setGG("b");
          }}
        >
          bb
        </button>
        <button type='reset'>reset</button>
        <button type='submit'>submit</button>
      </form>
    </>
  );
};
