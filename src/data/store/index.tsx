// import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "@reducers/time";
import salesListReducer from "@reducers/member/salesList";
import personVisitSlice from "@reducers/visit data/person visit";
import weekVisitSlice from "@reducers/visit data/week visit";
import thresholdSlice from "@reducers/kpi threshold/threshold";
import userSlice from "@reducers/nowUser";
import tripDetailSlice from "@reducers/trip detail/trip detail";
import dayPickerSlice from "@reducers/day picker/dayPickerControl";
import modalControlSlice from "@reducers/modal control/modalControl";
import listFormStateSlice from "@reducers/apply list/apply list";
import fileSlice from "@reducers/files/attach";
import errorSlice from "@reducers/error/errors";
import formInfoSlice from "../reducers/sign/form info";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    time: timeReducer,
    nowUser: userSlice,
    salesList: salesListReducer,
    personVisit: personVisitSlice,
    weekVisit: weekVisitSlice,
    threshold: thresholdSlice,
    tripDetail: tripDetailSlice,
    dayPicker: dayPickerSlice,
    modalControl: modalControlSlice,
    listFormState: listFormStateSlice,
    files: fileSlice,
    errors: errorSlice,
    formInfo:formInfoSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
