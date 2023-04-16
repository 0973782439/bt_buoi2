import { useForm } from "react-hook-form";
export interface IFormLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface Props {
  onLogin: (values: IFormLogin) => void;
  loading: boolean;
}
const LoginForm: React.FC<Props> = ({ onLogin, loading }) => {
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
            Địa chỉ email
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
            Mật khẩu
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
            <span className="text-sm">Lưu thông tin đăng nhập</span>
          </label>
        </div>
        <div className="flex items-center justify-evenly">
          <button
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
