import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFormLoginValidate } from "../../interfaces/ILogIn";
import { ISingUp } from "../../interfaces/ISingUp";
import { getAccesTokenLST } from "../../Utils/Token";
import { IUser } from "../../interfaces/IUser";
interface AuthState {
  user?: IUser;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccesTokenLST()),
  user: undefined,
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<IFormLoginValidate>) => {
      state.isAuthenticated = true;
    },
    getUser: (state, actions: PayloadAction<IUser>) => {
      state.user = actions.payload;
    },
    singup: (state, actions: PayloadAction<ISingUp>) => {},
    logout: (state, actions: PayloadAction) => {
      state.isAuthenticated = false;
    },
  },
});
export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
