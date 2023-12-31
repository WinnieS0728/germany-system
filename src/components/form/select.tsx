import Select, {
  GetOptionLabel,
  GetOptionValue,
  SelectInstance,
} from "react-select";
import AsyncSelect from "react-select/async";

import makeAnimated from "react-select/animated";
import { ChangeEvent, RefObject } from "react";

interface selectProp<T> {
  options: any;
  onChange: (event: string | ChangeEvent<Element>) => void;
  clear?: boolean;
  autoClose?: boolean;
  disable?: boolean;
  placeholder?: string;
  name?: string;
  noOptionComponent?: string | JSX.Element;
  getLabelFunction?: GetOptionLabel<T>;
  getValueFunction?: GetOptionValue<T>;
  filterFunction?: (candidate: T) => boolean;
  forwardRef?: RefObject<SelectInstance>;
  multi?: boolean;
  value?: string;
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
  getLabelFunction,
  getValueFunction,
  forwardRef,
  multi,
  value,
}: selectProp<any>) => {
  function handleChange(e: any) {    
    if (e) {
      onChange(e[`${value || "value"}`]);
    } else {
      onChange("");
    }
  }

  return (
    <>
      <Select
        ref={forwardRef}
        components={animateComponents}
        options={options as unknown as readonly unknown[]}
        onChange={handleChange}
        isClearable={clear}
        isMulti={multi}
        closeMenuOnSelect={autoClose}
        isDisabled={disable}
        placeholder={placeholder}
        className='w-full'
        noOptionsMessage={() => noOptionComponent}
        getOptionLabel={getLabelFunction}
        getOptionValue={getValueFunction}
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
}: selectProp<any>) => {
  function handleChange(e: any) {    
    if (e) {
      if (Array.isArray(e)) {
        const a = e.map((option) => option[value as string]).join(",");
        onChange(a);
      } else {
        onChange(e[value as string]);
      }
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
      menuPosition='fixed'
    />
  );
};

export const MySelect = {
  Normal,
  Async,
};
