import logo from "../../../logo-420-x-108.png";
import "../pages/Auth.css";
import { IFormLogin } from "../../../interfaces/ILogIn";
import LoginForm from "../components/LoginForm";
import i18next from "i18next";
import { Language } from "../../../interfaces/ICommon";
import { useAppDispatch } from "../../../app/hooks";
import { AuthActions } from "../../../app/Redux/Auth.slice";
const LoginPage = () => {
  const dispacth = useAppDispatch();
  const handleChangeLanguage = (lng: Language) => {
    i18next.changeLanguage(lng);
  };
  const onLogin = async (values: IFormLogin) => {
    const dataNew = { email: values.email, password: values.password };
    dispacth(AuthActions.login(dataNew));
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
        <LoginForm onLogin={onLogin} />
      </section>
    </div>
  );
};

export default LoginPage;
