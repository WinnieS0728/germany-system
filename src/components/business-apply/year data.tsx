import { useAppSelector } from "@/utils/redux";

export function GetData() {
  const visitData = useAppSelector((state) => state.personVisit);
  const data = visitData.body.map((i) => {
    return {
      ...i,
      total: i.ATU + i.existCus + i.newCus,
    };
  });
  const atu = data.map((i) =>
    i.total === 0 ? 0 : (i.ATU / i.total * 100).toFixed(1)
  );
  const existCus = data.map((i) =>
    i.total === 0 ? 0 : (i.existCus / i.total * 100).toFixed(1)
  );
  const newCus = data.map((i) =>
    i.total === 0 ? 0 : (i.newCus / i.total * 100).toFixed(1)
  );

  return {
    atu,
    existCus,
    newCus,
  };
}
