import React, { ReactHTML } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
interface Props {
  register: UseFormRegisterReturn;
  children: React.ReactNode;
  label: string;
  id: string;
  value?: string;
}
const Select: React.FC<Props> = ({ register, children, label, id, value }) => {
  const { t } = useTranslation();
  return (
    <div className="">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {t(label as any)}
      </label>
      <select
        defaultValue={value}
        {...register}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
