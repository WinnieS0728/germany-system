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

export enum tripEventList {
  atu = "TripEvent-5",
  existCus = "TripEvent-6",
  newCus = "TripEvent-7",
}
