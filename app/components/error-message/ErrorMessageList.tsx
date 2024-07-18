"use client";

import useNewError from "@/app/lib/hooks/useNewError";
import ErrorMessage from "./ErrorMessage";

const ErrorMessageList = () => {
  const { error } = useNewError();

  return (
    <div className="fixed flex flex-col gap-[10px] items-center top-10 right-10 z-[9999]">
      {error && error.map((el, i) => <ErrorMessage el={el} key={i} />)}
    </div>
  );
};

export default ErrorMessageList;
