import { useState } from "react";

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
  const labelText = type === "sort" ? "Sort by" : "Category";
  return (
    <div>
      <label htmlFor={type + "-select"}>{labelText}</label>
      <button id={type + "-select"} onClick={() => setIsHidden(!isHidden)}>
        {paramToString(current, type)}
      </button>
      <div hidden={isHidden}>
        {options.map((item, index) => {
          const string = paramToString(item, type);
          return (
            <button key={index} onClick={() => handleClick(item, type)}>
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

export default StyledSelect;
