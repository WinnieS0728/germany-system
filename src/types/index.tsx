export type monthType =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

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

export enum signStatus {
  "未簽核" = 0,
  "同意" = 1,
  "退簽" = 3,
  "作廢" = 4,
  "" = 5,
}
export enum signStatus_E {
  "not signed" = 0,
  "agree" = 1,
  "disagree" = 3,
  "void" = 4,
  "" = 5,
}

export enum tripEvent {
  "atu" = "TripEvent-5",
  "oldCus" = "TripEvent-6",
  "newCus" = "TripEvent-7",
}
