import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@/data/store";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";

type options = {
  label: string;
  value: string | undefined;
};

const yearSalesFilter_schema = z.object({
  year: z.string().optional(),
  EmpId: z.string().optional(),
});

type yearFilter = z.infer<typeof yearSalesFilter_schema>;

export function YearSalesHeader() {
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisYear } = useAppSelector((state) => state.time);
  const setSearch = useSearchParams()[1];

  const yearOption = useMemo(() => {
    const yearArray: string[] = [];
    for (let year = 2022; year <= Number(thisYear); year++) {
      yearArray.push(String(year));
    }

    const options = yearArray.map((year) => ({ label: year, value: year }));

    return options;
  }, [thisYear]);

  const SalesListOptions = useMemo(() => {
    const emptyOption: options = {
      label: "all",
      value: undefined,
    };
    const salesListOptions: options[] = salesList.map((member) => ({
      label: member.EmpName,
      value: member.EmpId,
    }));
    const options = [emptyOption].concat(salesListOptions);

    return options;
  }, [salesList]);

  const { handleSubmit, control } = useForm<yearFilter>({
    mode: "onSubmit",
    defaultValues: {
      year: thisYear,
      EmpId: undefined,
    },
  });

  function onSubmit(data: yearFilter) {
    const dataArray = Object.entries(data);
    for (const data of dataArray) {
      setSearch((prev) => {
        prev.delete(data[0]);
        return prev;
      });
      if (data[1]) {
        setSearch((prev) => {
          prev.set(data[0], data[1]);
          return prev;
        });
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='headerFilter sm:flex-row'
      >
        <Controller
          control={control}
          name='year'
          render={({ field: { onChange } }) => (
            <label className='label-input'>
              <p>年份</p>
              <MySelect.Normal
                options={yearOption}
                onChange={onChange}
              />
            </label>
          )}
        />
        <Controller
          control={control}
          name='EmpId'
          render={({ field: { onChange } }) => (
            <label className='label-input'>
              <p>業務</p>
              <MySelect.Normal
                options={SalesListOptions}
                onChange={onChange}
              />
            </label>
          )}
        />
        <input
          type='submit'
          value='search'
          className='submitBtn'
        />
      </form>
    </>
  );
}
