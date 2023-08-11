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


