"use client";

import { FC } from "react";

interface PageSwitcherProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (v: number) => void;
}

const PageSwitcher: FC<PageSwitcherProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  if (totalPages < 2) return null;

  return (
    <div className="flex gap-[10px] items-center">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`${
            currentPage === i + 1 && "bg-accent text-light"
          } w-10 h-10 rounded-full border boder-1 border-accent text-accent text-xl transition-all duration-200 hover:bg-accent hover:text-light`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default PageSwitcher;
