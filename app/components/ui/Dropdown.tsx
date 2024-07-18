"use client";

import { FC, useEffect, useRef, useState } from "react";
import OpenIcon from "@/public/icons/open.svg";

export interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: OptionType[] | undefined | null;
  currentValue: OptionType | null;
  setCurrentValue: (v: OptionType) => void;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  currentValue,
  setCurrentValue,
}) => {
  const [isOpen, setOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
      setOpen(false);
    }
  };

  const handleSelect = (o: OptionType) => {
    setCurrentValue(o);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-[10px] w-full min-w-[200px] z-10">
      <h5>{label}</h5>
      <button
        className="flex h-9 rounded-xl bg-black w-full items-center justify-between px-5 fill-light"
        type="button"
        onClick={() => setOpen(true)}
      >
        <p>{currentValue ? currentValue.label : "Не выбрано"}</p>
        <OpenIcon />
      </button>
      {isOpen && options && (
        <div
          className={`absolute w-full rounded-xl flex flex-col max-h-[200px] overflow-y-auto z-5 animate-slideIn shadow-base ${
            isOpen
              ? "top-[100%] opacity-100 pointer-events-auto transition-opacity duration-300"
              : "top-[-100%] opacity-0 pointer-events-none"
          }`}
          ref={optionsRef}
        >
          {options.map((o, i) => (
            <div
              className={`px-5 py-[15px] w-full h-[35px] items-center flex ${
                o.value === currentValue?.value ? "bg-accent" : "bg-grey"
              }`}
              key={i}
              onClick={() => handleSelect(o)}
            >
              <p>{o.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
