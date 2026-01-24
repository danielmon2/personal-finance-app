import React, { type JSX, useEffect, useId, useRef, useState } from "react";

import "./FloatingSelect.css";

type FloatingSelectProps = {
  frontButton: JSX.Element;
  children: JSX.Element[];
};

function FloatingSelect({ frontButton, children }: FloatingSelectProps) {
  const [isHidden, setIsHidden] = useState(true);
  const floatingSelectRef = useRef<HTMLDivElement>(null);
  const floatingSelectId = `floating-select-${useId()}`;

  useEffect(() => {
    window.addEventListener("resize", () =>
      moveFloatingSelect(floatingSelectRef),
    );
    window.addEventListener("mousedown", (event) => {
      event.stopPropagation();
      hideOnClick(event.target as HTMLElement, setIsHidden, floatingSelectId);
    });
    return () => {
      window.removeEventListener("resize", () =>
        moveFloatingSelect(floatingSelectRef),
      );
      window.removeEventListener("mousedown", (event) => {
        event.stopPropagation();
        hideOnClick(event.target as HTMLElement, setIsHidden, floatingSelectId);
      });
    };
  }, [floatingSelectId]);

  return (
    <div id={floatingSelectId} ref={floatingSelectRef}>
      <div
        className="floating-select__front-btn"
        onClick={() => {
          setIsHidden(!isHidden);
          moveFloatingSelect(floatingSelectRef);
        }}
      >
        {frontButton}
      </div>
      <div
        className="floating-select__options"
        onClick={() => setIsHidden(true)}
        hidden={isHidden}
      >
        {children}
      </div>
    </div>
  );
}

function moveFloatingSelect(
  floatingSelectRef: React.RefObject<HTMLDivElement | null>,
) {
  if (floatingSelectRef.current !== null) {
    const parent = floatingSelectRef.current;
    console.log(parent);
    const lastChild = parent.lastChild as HTMLDivElement;

    if (lastChild !== null) {
      lastChild.style.top = `${parent.offsetTop + parent.clientHeight + 10}px`;

      lastChild.style.left = `${parent.offsetLeft + parent.offsetWidth}px`;
    }
  }
}

function findParentClass(el: HTMLElement, floatingSelectId: string): boolean {
  const parent = el.parentElement;
  if (parent === null || parent.classList.contains("page-main")) {
    return false;
  } else if (parent.id === floatingSelectId) {
    return true;
  }

  return findParentClass(parent, floatingSelectId);
}

function hideOnClick(
  el: HTMLElement,
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>,
  floatingSelectId: string,
) {
  if (findParentClass(el, floatingSelectId) === false) {
    setIsHidden(true);
  }
}

export default FloatingSelect;
