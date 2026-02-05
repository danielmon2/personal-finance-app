import React from "react";
import type { JSX } from "react";

import "./FloatingSelectOption.css";

type FloatingSelectOptionProps = React.ComponentPropsWithoutRef<"button"> & {
  children: JSX.Element | string;
  isActive?: boolean;
  handleClick: (...args: unknown[]) => void;
};

function FloatingSelectOption({
  children,
  isActive,
  handleClick,
  ...rest
}: FloatingSelectOptionProps) {
  return (
    <button
      onClick={handleClick}
      className={`floating-select__option floating-select__option--${isActive ? "active" : "primary"}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default FloatingSelectOption;
