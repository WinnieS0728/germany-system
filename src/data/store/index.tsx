// import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@reducers/color";
import timeReducer from "@reducers/time";
import memberReducer from "@reducers/member/salesList";
import personVisitSlice from "@reducers/visit data/person visit";
import weekVisitSlice from "@reducers/visit data/week visit";
import thresholdSlice from "@reducers/kpi threshold/threshold";
import userSlice from "@reducers/nowUser";

const store = configureStore({
  reducer: {
    color: colorReducer,
    time: timeReducer,
    nowUser: userSlice,
    member: memberReducer,
    personVisit: personVisitSlice,
    weekVisit: weekVisitSlice,
    threshold: thresholdSlice,
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
