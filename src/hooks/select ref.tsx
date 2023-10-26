import { useCallback, useRef } from "react";
import { SelectInstance } from "react-select";

export const useSelectRef = () => {
  const purposeRef = useRef<SelectInstance>(null);
  const countryRef = useRef<SelectInstance>(null);
  const postalCodeRef = useRef<SelectInstance>(null);
  const cusRef = useRef<SelectInstance>(null);

  const newDetailRef = {
    purpose: purposeRef,
    country: countryRef,
    postalCode: postalCodeRef,
    cus: cusRef,
  };

  const clearCusSelect = useCallback(() => {
    cusRef.current?.clearValue();
  }, []);
  const clearPostCodeSelect = useCallback(() => {
    postalCodeRef.current?.clearValue();
  }, []);

  function clearDetailSelect() {
    purposeRef.current?.clearValue();
    countryRef.current?.clearValue();
    postalCodeRef.current?.clearValue();
    cusRef.current?.clearValue();
  }

  const transportRef = useRef<SelectInstance>(null);
  const currRef = useRef<SelectInstance>(null);
  const deputyRef = useRef<SelectInstance>(null);

  const newFormRef = {
    transport: transportRef,
    curr: currRef,
    deputy: deputyRef,
  };

  function clearNewFormSelect() {
    transportRef.current?.clearValue();
    currRef.current?.clearValue();
    deputyRef.current?.clearValue();
  }

  const otherSignRef = useRef<SelectInstance>(null);
  return {
    clearPostCodeSelect,
    clearCusSelect,
    newDetailRef,
    clearDetailSelect,
    newFormRef,
    clearNewFormSelect,
    otherSignRef,
  };
};
