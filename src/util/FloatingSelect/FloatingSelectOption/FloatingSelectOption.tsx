import type { JSX } from "react";

import "./FloatingSelectOption.css";

type FloatingSelectOptionProps = {
  children: JSX.Element | string;
  isActive?: boolean;
  handleClick: (...args: unknown[]) => void;
};

function FloatingSelectOption({
  children,
  isActive,
  handleClick,
}: FloatingSelectOptionProps) {
  return (
    <button
      onClick={handleClick}
      className={`floating-select__option floating-select__option--${isActive ? "active" : "primary"}`}
    >
      {children}
    </button>
  );
}

export default FloatingSelectOption;
