import { Main } from "@/layouts/main";
import AsyncSelect from "react-select/async";
import { useCallback, useMemo, useState } from "react";

const QAQ = () => {
  console.count("render");
  // ! 設定 dept state
  const [dept, setDept] = useState<string>("0");
  console.log({ dept });

  // ! 員工清單
  const employee = useMemo(
    () => [
      { name: "a", dept: "1" },
      { name: "b", dept: "1" },
      { name: "c", dept: "2" },
      { name: "d", dept: "2" },
      { name: "x", dept: "3" },
      { name: "y", dept: "3" },
      { name: "z", dept: "3" },
    ],
    []
  );

  // ! fetch 部門的選項
  async function getDeptOptions() {
    return new Promise((resolve) => {
      resolve([
        { label: "dept-1", value: "1" },
        { label: "dept-2", value: "2" },
        { label: "dept-3", value: "3" },
      ]);
    });
  }

  // ! filter 人員的公司 拿到正確的名單
  const getDeptEmployee = useCallback(
    function (dept: string) {
      const empInThisDept = employee.filter((e) => e.dept === dept);

      return empInThisDept.map((i) => {
        return { label: i.name, value: i.name };
      });
    },
    [employee]
  );

  // ! fetch 人員的選項
  const getEmpOptions = useCallback(
    async function () {
      return new Promise((resolve, reject) => {
        resolve(getDeptEmployee(dept));
      });
    },
    [dept, getDeptEmployee]
  );
  console.log("options", getEmpOptions());

  // ! 選了部門改變 state
  function handleChange(d: { label: string; value: string }) {
    console.log(d);
    setDept(d.value);
  }
  return (
    <Main>
      <div className='flex items-center gap-4'>
        部門
        <AsyncSelect
          defaultOptions
          loadOptions={getDeptOptions as any}
          onChange={handleChange as any}
          autoFocus
          openMenuOnFocus
        />
        人員
        <AsyncSelect
          defaultOptions
          loadOptions={getEmpOptions as any}
          autoFocus
          openMenuOnFocus
        />
      </div>
    </Main>
  );
};
