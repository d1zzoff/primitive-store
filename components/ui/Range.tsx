"use client";

import { ChangeEvent, FC } from "react";

interface RangeProps {
  label: string;
  firstValue: string;
  setFirstValue: (v: string) => void;
  secondValue: string;
  setSecondValue: (v: string) => void;
}

const Range: FC<RangeProps> = ({
  label,
  firstValue,
  secondValue,
  setFirstValue,
  setSecondValue,
}) => {
  return (
    <div className="flex flex-col gap-[10px] items-start">
      <h5>{label}</h5>
      <div className="flex justify-between gap-[10px] w-full h-[35px]">
        <input
          type="text"
          className="rounded-xl bg-black w-full h-[35px] text-light px-4 placeholder-light-grey text-sm transition-all duration-300 border border-black focus:border-accent"
          placeholder="Цена от"
          value={firstValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFirstValue(e.target.value)
          }
        />
        <input
          type="text"
          className="rounded-xl bg-black w-full h-[35px] text-light px-4 placeholder-light-grey text-sm transition-all duration-300 border border-black focus:border-accent"
          placeholder="до"
          value={secondValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSecondValue(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Range;
