import { Required } from "@/components/form/required";
import { MySelect } from "@/components/form/select";
import { useOptions } from "@/hooks/options";
import { useSelectRef } from "@/hooks/select ref";
import { Controller, useFormContext } from "react-hook-form";

export const AgentForm = () => {
  const { control } = useFormContext();

  const { newFormRef } = useSelectRef();

  const { options } = useOptions();

  return (
    <div className='label-input'>
      <label><Required />代理人 :</label>
      <Controller
        control={control}
        name='Deputy'
        render={({ field: { onChange } }) => (
          <MySelect.Async
            forwardRef={newFormRef.deputy}
            onChange={onChange}
            options={options.agent}
            getLabelFunction={(option: any) => option.EmpName}
            getValueFunction={(option: any) => option.EmpId}
            value='EmpId'
            placeholder='選擇代理人...'
          />
        )}
      />
    </div>
  );
};
