import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IGender, ILocation, ISingUp } from "../../../interfaces/ISingUp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading/Loading";
interface Props {
  loading: boolean;
  state: Array<ILocation>;
  locations: Array<ILocation>;
  onSingup: (values: ISingUp) => void;
  handleSelectedRegion: (idRegion: number) => void;
}
const GENDER = [
  { id: "male", value: "Nam" },
  { id: "female", value: "Nữ" },
];
const SingUpForm: React.FC<Props> = ({
  loading,
  locations,
  onSingup,
  handleSelectedRegion,
  state,
}) => {
  const { t } = useTranslation();
  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={""} key={""}>
        Quốc gia
        {""}
      </option>,
    ];
    locations.map((location: ILocation, i) => {
      arrRegion.push(
        <option value={location.id} key={location.id}>
          {location.name}
        </option>
      );
    });
    return arrRegion;
  };
  const renderState = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={""} key={""}>
        Thành phố
        {""}
      </option>,
    ];
    state.map((location: ILocation, i) => {
      arrRegion.push(
        <option value={location.id} key={location.id}>
          {location.name}
        </option>
      );
    });
    return arrRegion;
  };
  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={""} key={""}>
        Giới tính
        {""}
      </option>,
    ];
    GENDER.map((gender: IGender, i) => {
      arrGender.push(
        <option value={gender.id} key={gender.id}>
          {gender.value}
        </option>
      );
    });
    return arrGender;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISingUp>();

  const onSubmit = (values: ISingUp) => {
    onSingup(values);
  };
  const [region] = watch(["region"]);
  React.useEffect(() => {
    if (region) {
      handleSelectedRegion(region);
    }
  }, [region]);
  return (
    <div className="w-full max-w-xl">
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="repeatPassword"
          >
            Nhập lại mật khẩu
          </label>
          <input
            {...register("repeatPassword", {
              required: true,
              minLength: 4,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Mật khẩu không khớp";
                }
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="repeatPassword"
            type="password"
          />
          {errors.repeatPassword &&
            errors.repeatPassword.type === "required" && (
              <p className="text-red-500 text-xs italic">
                Mật khẩu không được bỏ trống
              </p>
            )}
          {errors.repeatPassword &&
            errors.repeatPassword.type === "minLength" && (
              <p className="text-red-500 text-xs italic">
                Mật khẩu tối thiểu 4 ký tự
              </p>
            )}
          {errors.repeatPassword &&
            errors.repeatPassword.type === "validate" && (
              <p className="text-red-500 text-xs italic">Mật khẩu không khớp</p>
            )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Họ tên
          </label>
          <input
            {...register("name", {
              required: true,
              minLength: 4,
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
          />
          {errors.name && errors.name.type === "required" && (
            <p className="text-red-500 text-xs italic">
              Họ tên không được bỏ trống
            </p>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <p className="text-red-500 text-xs italic">
              Họ tên tối thiểu 4 ký tự
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giới tính
          </label>

          <select
            {...register("gender")}
            id="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {renderGender()}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quốc gia
          </label>
          <select
            {...register("region")}
            id="region"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {renderRegion()}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Thành phố
          </label>

          <select
            {...register("state")}
            id="state"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {renderState()}
          </select>
        </div>
        <div className="flex justify-center gap-3">
          <button
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading && <Loading />}
            Đăng ký
          </button>
          <Link
            to="/Login"
            className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SingUpForm;
