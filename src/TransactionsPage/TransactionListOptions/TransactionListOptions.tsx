import StyledSelect from "./StyledSelect/StyledSelect";
import "./TransactionListOptions.css";

type TransactionListOptionsProps = {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  sorting: string[];
  categories: string[];
};

function TransactionListOptions({
  searchParams,
  setSearchParams,
  sorting,
  categories,
}: TransactionListOptionsProps) {
  function handleSelectClick(value: string, type: string): void {
    setSearchParams(createNewSearchParams(searchParams, value, type));
  }

  return (
    <div className="options">
      <input
        className="options__input squared-border"
        defaultValue={""}
        placeholder="Search transactions"
        onChange={(e) =>
          setSearchParams(
            createNewSearchParams(searchParams, e.target.value, "search")
          )
        }
      ></input>
      <div className="flex">
        <StyledSelect
          options={sorting}
          type="sort"
          current={
            searchParams.get("sort") === null
              ? "latest"
              : (searchParams.get("sort") as string)
          }
          handleClick={handleSelectClick}
        />
        <StyledSelect
          options={categories}
          type="category"
          current={
            searchParams.get("category") === null
              ? "all"
              : (searchParams.get("category") as string)
          }
          handleClick={handleSelectClick}
        />
      </div>
    </div>
  );
}

function createNewSearchParams(
  searchParams: URLSearchParams,
  value: string,
  type: string
): URLSearchParams {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(type, value);
  return newSearchParams;
}

export default TransactionListOptions;
