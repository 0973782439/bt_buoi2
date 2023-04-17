import { useState } from "react";
import logo from "../../../logo-420-x-108.png";
import "../pages/Auth.css";
import http from "../../../Utils/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IFormLogin } from "../../../interfaces/ILogIn";
import LoginForm from "../components/LoginForm";

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
      const dataNew = { email: values.email, password: values.password };
      const data = http.post<any>("auth/login", dataNew);
      data
        .then((res: any) => {
          const { data, code } = res.data;
          if (code === 200) {
            Cookies.set("token", data.token, {
              expires: values.rememberMe ? 7 : undefined,
            });
          }
          navigate("/");
        })
        .catch((error: any) => {
          toast.error(error.response?.data?.message);
          setLoading(false);
        });
      setLoading(false);
    } catch (error: any) {
      toast.error("Best request");
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
