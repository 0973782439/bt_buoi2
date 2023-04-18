import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  label: string;
  register: any;
}

const Checkbox: React.FC<Props> = ({ label, register }) => {
  const { t } = useTranslation();
  return (
    <label className=" text-gray-500 font-bold">
      <input {...register} className="mr-2 leading-tight" type="checkbox" />
      <span className="text-sm">{t(label as any)}</span>
    </label>
  );
};
export default Checkbox;
