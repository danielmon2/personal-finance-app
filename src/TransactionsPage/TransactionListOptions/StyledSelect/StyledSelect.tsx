import "./StyledSelect.css";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import FloatingSelect from "../../../util/FloatingSelect/FloatingSelect";
import FloatingSelectOption from "../../../util/FloatingSelect/FloatingSelectOption/FloatingSelectOption";

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
  const labelText = type === "sort" ? "Sort by" : "Category";
  const windowWidth = useWindowWidth();
  const iconSource =
    type === "sort"
      ? "./images/icon-sort-mobile.svg"
      : "./images/icon-filter-mobile.svg";

  return (
    <FloatingSelect
      frontButton={
        <div>
          {!windowWidth.mobile && (
            <label htmlFor={type + "-select"}>{labelText}</label>
          )}
          <button
            id={type + "-select"}
            className={
              "select-options__dropdown" +
              (!windowWidth.mobile ? " squared-border" : "")
            }
          >
            {windowWidth.mobile &&
            !windowWidth.tablet &&
            !windowWidth.desktop ? (
              <img className="select-options__icon" src={iconSource} />
            ) : (
              <>
                {paramToString(current, type)}
                <img
                  className="caret-down"
                  src="./images/icon-caret-down.svg"
                />
              </>
            )}
          </button>
        </div>
      }
    >
      {options.map((item, index) => {
        const string = paramToString(item, type);
        return (
          <FloatingSelectOption
            key={index}
            isActive={item === current}
            handleClick={() => {
              handleClick(item, type);
            }}
          >
            {string}
          </FloatingSelectOption>
        );
      })}
    </FloatingSelect>
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
