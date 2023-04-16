import { useState } from "react";
import logo from "../../../logo-420-x-108.png";
import LoginForm, { IFormLogin } from "../components/LoginForm";
import "../pages/LoginPage.css";
import http from "../../../Utils/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface IResponseApi<Data> {
  message?: string;
  data: Data;
  status?: number;
}
type AuthResponse = IResponseApi<{ token: string; user: string }>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onLogin = async (values: IFormLogin) => {
    try {
      setLoading(true);
      const { data, status } = await http.post<AuthResponse>(
        "/api/auth/login",
        values
      );
      // const { data, status } = await http.post<AuthResponse>("User/login", values);
      setLoading(false);
      if (status === 200) {
        Cookies.set("token", data?.data?.token, {
          expires: values.rememberMe ? 7 : undefined,
        });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <section id="login">
      <img className="logo" src={logo} alt="logopowergate" />
      <LoginForm onLogin={onLogin} loading={loading} />
    </section>
  );
};

export default LoginPage;
