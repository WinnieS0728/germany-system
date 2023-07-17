import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@/hooks/redux";
import api from "@/lib/api";
import { Controller, useFormContext } from "react-hook-form";

export const AgentForm = () => {
  const { control } = useFormContext();
  const nowUser = useAppSelector((state) => state.nowUser);

  async function getMemberOptions() {
    const res = await api.getMember("", nowUser.body.DeptId);
    return res
      .filter((i: { EmpId: string }) => i.EmpId !== nowUser.body.EmpId)
      .map((i: { EmpName: string; EmpId: string }) => {
        return {
          label: i.EmpName,
          value: i.EmpId,
        };
      });
  }

  return (
    <div className='label-input'>
      <label>代理人 :</label>
      <Controller
        control={control}
        name='agent'
        render={({ field: { onChange } }) => (
          <MySelect.Async
            options={getMemberOptions}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};
