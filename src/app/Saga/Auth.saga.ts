import { fork, take, call, delay, put } from "redux-saga/effects";
import { AuthActions } from "../Redux/Auth.slice";
import { IFormLoginValidate } from "../../interfaces/ILogIn";
import { PayloadAction } from "@reduxjs/toolkit";
import { Login, Singup } from "../../api/Auth.api";
import { RESPONSE_STATUS_SUCCESS } from "../../Utils/httpResponseCode";
import { CommonActions } from "../Redux/Common.slice";
import { toast } from "react-toastify";
import { ISingUp } from "../../interfaces/ISingUp";
function* handleLogIn(datas: IFormLoginValidate) {
  yield put(CommonActions.displayLoading());
  try {
    const { data, status } = yield call(Login, datas);
    if (
      data.code === RESPONSE_STATUS_SUCCESS &&
      status === RESPONSE_STATUS_SUCCESS
    ) {
      yield delay(1000);
      // yield put(AuthActions.loginSucces(data.data));
      yield put(CommonActions.hideLoading());
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield delay(1000);
    yield put(CommonActions.hideLoading());
  }
}
function* handleSingUp(values: ISingUp) {
  yield put(CommonActions.displayLoading());
  try {
    const { data, status } = yield call(Singup, values);
    if (
      status === RESPONSE_STATUS_SUCCESS &&
      data.code === RESPONSE_STATUS_SUCCESS
    ) {
      yield delay(1000);
      yield put(CommonActions.hideLoading());
    } else {
      toast.error(data.message);
      yield put(CommonActions.hideLoading());
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield delay(1000);
    yield put(CommonActions.hideLoading());
  }
}
function* watchLogin() {
  while (true) {
    const actions: PayloadAction<IFormLoginValidate> = yield take(
      AuthActions.login.type
    );
    yield fork(handleLogIn, actions.payload);
  }
}
function* watchSingup() {
  while (true) {
    const actions: PayloadAction<ISingUp> = yield take(AuthActions.singup.type);
    yield fork(handleSingUp, actions.payload);
  }
}
export function* AuthSaga() {
  yield fork(watchLogin);
  yield fork(watchSingup);
}
