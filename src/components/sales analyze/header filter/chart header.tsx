import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@data/store";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { FilterSubmit } from "./filter submit";

const filterForm_schema = z.object({
  EmpId: z.string().optional(),
});

type filterForm = z.infer<typeof filterForm_schema>;

export function ChartHeader() {
  const salesList = useAppSelector((state) => state.salesList).body;
  const setSearch = useSearchParams()[1];
  const methods = useForm<filterForm>({
    shouldUnregister: false,
    defaultValues: {
      EmpId: undefined,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  type options = {
    label: string;
    value: string | undefined;
  };

  const options = useMemo(() => {
    const emptyOption: options = { label: "all", value: undefined };
    const restOption: options[] = salesList.map((data) => ({
      label: data.EmpName,
      value: data.EmpId,
    }));
    return [emptyOption].concat(restOption);
  }, [salesList]);

  function onSubmit(data: filterForm) {
    const { EmpId } = data;
    if (EmpId) {
      setSearch(
        (prev) => {
          prev.set("EmpId", EmpId);
          return prev;
        },
        { replace: true }
      );
    } else {
      setSearch(
        (prev) => {
          prev.delete("EmpId");
          return prev;
        },
        {
          replace: true,
        }
      );
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='headerFilter flex-row'
        >
          <Controller
            control={control}
            name='EmpId'
            render={({ field: { onChange } }) => (
              <label className='label-input w-full'>
                業務
                <MySelect.Normal
                  options={options}
                  onChange={onChange}
                />
              </label>
            )}
          />
          <FilterSubmit disable={isSubmitting} />
        </form>
      </FormProvider>
    </>
  );
}
