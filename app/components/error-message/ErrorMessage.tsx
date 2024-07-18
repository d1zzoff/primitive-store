"use client";

import ErrorIcon from "@/public/icons/error.svg";
import CloseIcon from "@/public/icons/close.svg";
import useNewError, { IError } from "@/app/lib/hooks/useNewError";
import { useEffect, useState } from "react";
import clsx from "clsx";

const ErrorMessage = ({ el }: { el: IError }) => {
  const { removeError } = useNewError();
  const [removingError, setRemovingError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemovingError(true);
      setTimeout(() => {
        removeError(el.id);
        setRemovingError(false);
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [el]);

  return (
    <div
      className={clsx(
        `w-[380px] rounded-2xl bg-grey shadow-base flex-col gap-[10px] border border-[3px] border-grey z-[9999] transition-all duration-3`,
        {
          "animate-slideOut": removingError,
          "animate-slideIn": !removingError,
        }
      )}
    >
      <div className="py-[15px] px-[10px] relative w-full h-full z-[9999]">
        <button
          className="absolute w-[18px] h-[18px] top-5 right-5"
          onClick={() => removeError(el.id)}
        >
          <CloseIcon className="fill-light w-[18px] h-[18px]" />
        </button>
        <div className="flex gap-[20px] items-center">
          <ErrorIcon className="w-[60px] h-[60px] fill-red flex-shrink-0" />
          <div className="flex flex-col gap-[5px] items-start">
            <h5>Произошла ошибка!</h5>
            <p>{el.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
