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
