import React, { useEffect, useRef, useState } from "react";

import "./StyledSelect.css";
import { useWindowWidth } from "../../../useWindowWidth";

type StyledSelectProps = {
  options: string[];
  type: string;
  current: string;
  handleClick: (value: string, type: string) => void;
};

function StyledSelect({
  options,
  type,
  current,
  handleClick,
}: StyledSelectProps) {
  const [isHidden, setIsHidden] = useState(true);
  const styledSelectRef = useRef<HTMLDivElement>(null);
  const labelText = type === "sort" ? "Sort by" : "Category";
  // const isMobileWidth = useUserContext();
  const windowWidth = useWindowWidth();
  const iconSource =
    type === "sort"
      ? "./images/icon-sort-mobile.svg"
      : "./images/icon-filter-mobile.svg";

  useEffect(() => {
    window.addEventListener("resize", () => resizeSelectEl(styledSelectRef));
    return () =>
      window.removeEventListener("resize", () =>
        resizeSelectEl(styledSelectRef)
      );
  }, []);

  return (
    <div ref={styledSelectRef} className="styled-select">
      {!windowWidth.mobile && (
        <label htmlFor={type + "-select"}>{labelText}</label>
      )}
      <button
        id={type + "-select"}
        className={
          "select-options__dropdown" +
          (!windowWidth.mobile ? " squared-border" : "")
        }
        onClick={() => {
          setIsHidden(!isHidden);
          resizeSelectEl(styledSelectRef);
        }}
      >
        {windowWidth.mobile && !windowWidth.tablet && !windowWidth.desktop ? (
          <img className="select-options__icon" src={iconSource} />
        ) : (
          <>
            {paramToString(current, type)}
            <img className="caret-down" src="./images/icon-caret-down.svg" />
          </>
        )}
      </button>
      <div className="select-options select-options--primary" hidden={isHidden}>
        {options.map((item, index) => {
          const string = paramToString(item, type);
          let active = "";
          if (item === current) {
            active = " select-options__btn--active";
          }
          return (
            <button
              className={"select-options__btn" + active}
              key={index}
              onClick={() => {
                setIsHidden(true);
                handleClick(item, type);
              }}
            >
              {string}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function paramToString(param: string, type: string): string {
  let string: string;
  if (type === "sort") {
    string = param[0].toUpperCase() + param.slice(1);
    if (param === "az") {
      string = "A - Z";
    } else if (param === "za") {
      string = "Z - A";
    }
  } else {
    string = param.replace("-", " ");
    string = string[0].toUpperCase() + string.slice(1);
  }

  return string;
}

function resizeSelectEl(
  styledSelectRef: React.RefObject<HTMLDivElement | null>
) {
  if (styledSelectRef.current !== null) {
    const ref = styledSelectRef.current;
    const lastChild = ref.lastChild as HTMLDivElement;

    if (lastChild !== null) {
      lastChild.style.top = `${ref.offsetTop + ref.clientHeight + 10}px`;

      lastChild.style.left = `${ref.offsetLeft + ref.offsetWidth}px`;
    }
  }
}

export default StyledSelect;
