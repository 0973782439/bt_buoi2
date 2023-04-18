import { useState } from "react";
import logo from "../../../logo-420-x-108.png";
import "../pages/Auth.css";
import http from "../../../Utils/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IFormLogin } from "../../../interfaces/ILogIn";
import LoginForm from "../components/LoginForm";
import i18next from "i18next";
import { Language } from "../../../interfaces/ICommon";
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChangeLanguage = (lng: Language) => {
    i18next.changeLanguage(lng);
  };
  const onLogin = async (values: IFormLogin) => {
    try {
      const dataNew = { email: values.email, password: values.password };
      const data = http.post<any>("auth/login", dataNew);
      data
        .then((res: any) => {
          const { data, code } = res.data;
          if (code === 200) {
            setLoading(true);
            Cookies.set("token", data.token, {
              expires: values.rememberMe ? 7 : undefined,
            });
            setLoading(false);
          }
          navigate("/");
        })
        .catch((error: any) => {
          setLoading(true);
          toast.error(error.response?.data?.message);
          setLoading(false);
        });
    } catch (error: any) {
      toast.error("Best request");
      setLoading(false);
    }
  };
  return (
    <div>
      <section className="language fixed">
        <button
          onClick={() => handleChangeLanguage(Language.vi)}
          className="m-2 underline"
        >
          Tiếng Việt
        </button>
        <span>|</span>
        <button
          onClick={() => handleChangeLanguage(Language.en)}
          className="m-2 underline"
        >
          Tiếng Anh
        </button>
      </section>
      <section id="login">
        <img className="logo" src={logo} alt="logopowergate" />
        <LoginForm onLogin={onLogin} loading={loading} />
      </section>
    </div>
  );
};

export default LoginPage;
