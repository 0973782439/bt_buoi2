import { useForm } from "react-hook-form";
import { IFormLogin } from "../../../interfaces/ILogIn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading/Loading";
import Input from "../../../components/Input/Input";
import { rules as Rules } from "../../../Utils/Rules";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

interface Props {
  onLogin: (values: IFormLogin) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const isLoading = useAppSelector(
    (state: RootState) => state.common.isLoading
  );
  const { t } = useTranslation();
  const rules = Rules();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = (values: IFormLogin) => {
    onLogin(values);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <Input
            label="AUTH.email"
            name="email"
            id="email"
            type="text"
            className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
            register={{ ...register("email", rules.email) }}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="mb-6">
          <Input
            label="AUTH.password"
            id="password"
            name="password"
            type="password"
            className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
            register={{ ...register("password", rules.password) }}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className="mb-6">
          <Checkbox
            label="AUTH.save_login"
            register={{ ...register("rememberMe") }}
          />
        </div>
        <div className="flex items-center justify-evenly">
          <button
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            <Loading />
            {t("AUTH.login")}
          </button>
          <Link
            to="/Singup"
            className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {t("AUTH.singup")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
