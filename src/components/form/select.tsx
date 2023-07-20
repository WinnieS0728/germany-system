import Select from "react-select";
import AsyncSelect from "react-select/async";

import makeAnimated from "react-select/animated";

interface selectProp {
  options: any | any[];
  onChange: (event: any) => void;
  clear?: boolean;
  autoClose?: boolean;
  disable?: boolean;
  placeholder?: string;
  name?: string;
  noOptionComponent?: string | JSX.Element;
}

const animateComponents = makeAnimated();

const Normal = ({
  options,
  onChange,
  clear,
  autoClose,
  disable,
  placeholder,
  noOptionComponent,
}: selectProp) => {
  function handleChange(e: any) {
    // console.log(e);
    if (e) {
      onChange(e.value);
    } else {
      onChange("");
    }
  }

  return (
    <>
      <Select
        components={animateComponents}
        options={options}
        onChange={handleChange}
        isClearable={clear}
        isMulti={false}
        closeMenuOnSelect={autoClose}
        isDisabled={disable}
        placeholder={placeholder}
        className='w-full'
        noOptionsMessage={() => noOptionComponent}
      />
    </>
  );
};

const Async = ({
  options,
  onChange,
  clear,
  autoClose,
  disable,
  placeholder,
  noOptionComponent
}: selectProp) => {
  function handleChange(e: any) {
    if (e) {
      onChange(e.value);
    } else {
      onChange("");
    }
  }

  return (
    <AsyncSelect
      components={animateComponents}
      cacheOptions
      defaultOptions
      loadOptions={options}
      onChange={handleChange}
      isClearable={clear}
      closeMenuOnSelect={autoClose}
      isDisabled={disable}
      placeholder={placeholder}
      className='w-full'
      noOptionsMessage={() => noOptionComponent}
    />
  );
};

export const MySelect = {
  Normal,
  Async,
};
