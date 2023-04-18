import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IGender, ILocation, ISingUp } from "../../../interfaces/ISingUp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading/Loading";
import Input from "../../../components/Input/Input";
import { rules as Rules } from "../../../Utils/Rules";
import Select from "../../../components/Select/Select";
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
      <option disabled selected key={""}>
        Quốc gia
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
      <option disabled selected key={""}>
        Thành phố
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
      <option disabled selected key={""}>
        Giới tính
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
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISingUp>();
  const rules = Rules(getValues);

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
          <Input
            label="AUTH.repeatPassword"
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
            register={{
              ...register(
                "repeatPassword",
                rules.repeatPassword
                // {
                //   validate: (val: string) => {
                //     if (watch("password") != val) {
                //       return "Mật khẩu không khớp";
                //     }
                //   },
                // }
              ),
            }}
            errorMessage={errors.repeatPassword?.message}
          />
          {/* {errors.repeatPassword &&
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
            )} */}
          {/* <label
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
            )} */}
        </div>
        <div className="mb-6">
          <Input
            label="AUTH.name"
            id="name"
            name="name"
            type="text"
            className="bg-gray-50 border border-gray-300 focus:outline-none focus:shadow-outline block w-full shadow text-gray-900 text-sm rounded-lg p-2.5"
            register={{ ...register("name", rules.isRequired) }}
            errorMessage={errors.name?.message}
          />
        </div>
        <div className="mb-6">
          <Select
            register={{ ...register("gender") }}
            id="gender"
            label="AUTH.gender"
          >
            {renderGender()}
          </Select>
        </div>
        <div className="mb-6">
          <Select
            register={{ ...register("region") }}
            id="region"
            label="AUTH.region"
          >
            {renderRegion()}
          </Select>
        </div>
        <div className="mb-6">
          <Select
            register={{ ...register("state") }}
            id="state"
            label="AUTH.state"
          >
            {renderState()}
          </Select>
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
