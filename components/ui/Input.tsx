"use client";

import { forwardRef, ReactNode, ForwardedRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      Icon,
      type,
      ...props
    }: {
      label?: string;
      type?: string;
      Icon?: ReactNode;
      error?: any;
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label className="flex flex-col gap-[10px] w-full">
        {label && <h5>{label}</h5>}
        <div className="relative fill-light w-full">
          <input
            type={type || "text"}
            min={0}
            max={1000}
            className={`rounded-xl bg-black w-full h-[35px] placeholder-light-grey text-light text-sm fill-light pl-5 transition-all duration-300 border border-black focus:border-accent ${
              Icon ? "pr-[50px]" : "pr-5"
            }`}
            ref={ref}
            autoComplete="off"
            {...props}
          />
          {Icon && (
            <span className="absolute right-5 top-1/2 transform -translate-y-1/2">
              {Icon}
            </span>
          )}
        </div>
        {error && <p className="text-red leading-5">{String(error)}</p>}
      </label>
    );
  }
);

export default Input;
