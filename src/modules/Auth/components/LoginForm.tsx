import { useForm } from "react-hook-form";
import { IFormLogin } from "../../../interfaces/ILogIn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading/Loading";
interface Props {
  onLogin: (values: IFormLogin) => void;
  loading: boolean;
}
const LoginForm: React.FC<Props> = ({ onLogin, loading }) => {
  const { t } = useTranslation();
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {t("AUTH.email")}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  mb-3  focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500 text-xs italic">
              Email không được bỏ trống
            </p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-red-500 text-xs italic">
              Email phải đúng định dạng
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            {t("AUTH.password")}
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: 4,
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500 text-xs italic">
              Mật khẩu không được bỏ trống
            </p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-red-500 text-xs italic">
              Mật khẩu tối thiểu 4 ký tự
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className=" text-gray-500 font-bold">
            <input
              {...register("rememberMe")}
              className="mr-2 leading-tight"
              type="checkbox"
            />
            <span className="text-sm">{t("AUTH.save_login")}</span>
          </label>
        </div>
        <div className="flex items-center justify-evenly">
          <button
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading && <Loading />}
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
