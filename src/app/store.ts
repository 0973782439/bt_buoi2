import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import AuthSlice from "./Redux/Auth.slice";
import CommonSlice from "./Redux/Common.slice";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    common: CommonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
sagaMiddleware.run(rootSaga);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
