// import api from "@api";

export interface responseType {
  [keys: string]: string;
}

export type stateType = (responseType | undefined)[];

export enum statusType {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

// async function getTripEvent() {
//   const res: responseType[] = await api.getTripEvent();
//   console.log(res);
//   const atu = res.find((i) => i.ResourcesName === "拜訪A.T.U.")?.ResourcesId;
//   const existCus = res.find(
//     (i) => i.ResourcesName === "拜訪現有客戶"
//   )?.ResourcesId;
//   const newCus = res.find((i) => i.ResourcesName === "拜訪新客戶")?.ResourcesId;

//   return {
//     atu,
//     existCus,
//     newCus,
//   };
// }
// getTripEvent();

export enum tripEventList {
  atu = "TripEvent-5",
  existCus = "TripEvent-6",
  newCus = "TripEvent-7",
}
