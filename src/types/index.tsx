export const month_shortName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export interface signDataType {
  id: string;
  createDate: string;
  status: string;
  company: string;
  dept: string;
  EmpId: string;
  EmpName: string;
  transportation: string;
  isLodging: string;
  stayDays: string;
  days: string;
  money: string;
  agent: string;
}

export type component = {
  type: "addForm" | "sign";
  data?: signDataType;
};

export type signStatus = 0 | 1 | 3 | 4 | 5;
// "未簽核" = 0,
// "同意" = 1,
// "退簽" = 3,
// "作廢" = 4,
// "" = 5,

export enum tripEvent {
  "atu" = "TripEvent-5",
  "oldCus" = "TripEvent-6",
  "newCus" = "TripEvent-7",
}

export const moneyType = ["TWD", "RMB", "EUR", "USD"] as const;

export type sc_props = {
  className?: string;
};

export interface queryStatus {
  status: "idle" | "pending" | "error" | "success";
  message?: string;
}
