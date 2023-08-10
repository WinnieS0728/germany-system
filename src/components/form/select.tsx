import Select, { GetOptionLabel, GetOptionValue } from "react-select";
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
  getLabelFunction?: GetOptionLabel<any[]>;
  getValueFunction?: GetOptionValue<any[]>;
  filterFunction?: (candidate: any) => boolean;
  value?: string;
  forwardRef?: any;
  multi?: boolean;
  defaultValue?: any;
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
  forwardRef,
  multi,
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
        ref={forwardRef}
        components={animateComponents}
        options={options}
        onChange={handleChange}
        isClearable={clear}
        isMulti={multi}
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
  noOptionComponent,
  getLabelFunction,
  getValueFunction,
  filterFunction,
  value,
  forwardRef,
  multi,
}: selectProp) => {
  function handleChange(e: any) {
    if (e) {
      // console.log(e);
      onChange(e[value as string]);
    } else {
      onChange("");
    }
  }

  return (
    <AsyncSelect
      ref={forwardRef}
      components={animateComponents}
      cacheOptions
      defaultOptions
      loadOptions={options}
      getOptionLabel={getLabelFunction}
      getOptionValue={getValueFunction}
      filterOption={filterFunction}
      onChange={handleChange}
      isClearable={clear}
      isMulti={multi}
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
