"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { MouseEvent } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full gap-[10px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        accent: "bg-accent text-light fill-light hover:shadow-accent",
        red: "bg-red text-light fill-light hover:shadow-red",
        green: "bg-green text-light fill-light hover:shadow-green",
        borderAccent:
          "bg-transparent border border-accent text-accent fill-accent hover:bg-accent hover:text-light hover:fill-light",
        borderRed:
          "bg-transparent border border-red text-red fill-red hover:bg-red hover:text-light hover:fill-light",
        borderGreen:
          "bg-transparent border border-green text-green fill-green hover:bg-green hover:text-light hover:fill-light",
        inactive: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        default: "h-[35px] px-5",
        sm: "h-[35px] px-[30px]",
        lg: "h-[35px] px-10",
        full: "h-[35px] w-full",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  click: (e: MouseEvent<HTMLButtonElement>) => void;
  inactive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  click,
  inactive,
  children,
  ...props
}) => {
  const variantClass = inactive ? "inactive" : variant;

  return (
    <button
      type="button"
      className={buttonVariants({ variant: variantClass, size, className })}
      onClick={inactive ? () => {} : click}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
