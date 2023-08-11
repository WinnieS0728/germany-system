import { createSlice } from "@reduxjs/toolkit";
import { setPersonVisitData } from "@actions/visit data/set person visit";
import { statusType } from "types/api";
import { tripEvent } from "@/types";

const data: (typeof object)[] = [];
const object = {
  ATU: 0,
  existCus: 0,
  newCus: 0,
};

for (let m = 0; m < 12; m++) {
  data.push(object);
}

const personVisitSlice = createSlice({
  name: "personVisit",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPersonVisitData.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        if (action.payload !== null) {
          action.payload.map((i) => {
            const target = Number(i.MM) - 1;
            switch (i.ResourcesId) {
              case tripEvent.atu:
                state.body[target].ATU = +i.Vqty;
                break;
              case tripEvent.oldCus:
                state.body[target].existCus = +i.Vqty;
                break;
              case tripEvent.newCus:
                state.body[target].newCus = +i.Vqty;
                break;
              default:
                break;
            }
          });
        } else {
          state.body = data;
        }
      })
      .addCase(setPersonVisitData.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setPersonVisitData.rejected, (state) => {
        state.status = statusType.failed;
        state.body = data;
      });
  },
});

export default personVisitSlice.reducer;
