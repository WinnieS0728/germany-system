// import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@reducers/color";
import timeReducer from "@reducers/time";
import salesListReducer from "@reducers/member/salesList";
import personVisitSlice from "@reducers/visit data/person visit";
import weekVisitSlice from "@reducers/visit data/week visit";
import thresholdSlice from "@reducers/kpi threshold/threshold";
import userSlice from "@reducers/nowUser";
import tripDetailSlice from "@reducers/trip detail/trip detail";

const store = configureStore({
  reducer: {
    color: colorReducer,
    time: timeReducer,
    nowUser: userSlice,
    salesList: salesListReducer,
    personVisit: personVisitSlice,
    weekVisit: weekVisitSlice,
    threshold: thresholdSlice,
    tripDetail: tripDetailSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
