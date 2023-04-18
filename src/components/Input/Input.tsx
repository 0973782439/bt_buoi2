import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  register: any;
  label: string;
  id: string;
}
const Input: React.FC<Props> = ({
  errorMessage,
  placeholder,
  className,
  type,
  name,
  register,
  label,
  id,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full items-center">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t(label as any)}
        </label>
      )}
      <input
        {...register}
        type={type}
        name={name}
        id={id}
        className={className}
        placeholder={placeholder ? t(placeholder as any) : t(label as any)}
      />
      {errorMessage && (
        <p className="text-red-600 max-h-0  text-xs italic">
          {t(`RULE.${errorMessage}` as any)}
        </p>
      )}
    </div>
  );
};

export default Input;
