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
  return (
    <div>
      <input
        defaultValue={""}
        placeholder="Search transactions"
        onChange={(e) =>
          setSearchParams(
            createNewSearchParams(searchParams, e.target.value, "search")
          )
        }
      ></input>
      <label htmlFor="sort-select">Sort by</label>
      <select
        id="sort-select"
        defaultValue={
          searchParams.get("sort") === null
            ? "latest"
            : (searchParams.get("sort") as string)
        }
        onChange={(e) =>
          setSearchParams(
            createNewSearchParams(searchParams, e.target.value, "sort")
          )
        }
      >
        {sorting.map((item, index) => {
          let string = item[0].toUpperCase() + item.slice(1);
          if (item === "az") {
            string = "A - Z";
          } else if (item === "za") {
            string = "Z - A";
          }
          return (
            <option key={index} value={item}>
              {string}
            </option>
          );
        })}
      </select>
      <label htmlFor="category-select">Category</label>
      <select
        id="category-select"
        defaultValue={
          searchParams.get("category") === null
            ? "all"
            : (searchParams.get("category") as string)
        }
        onChange={(e) =>
          setSearchParams(
            createNewSearchParams(searchParams, e.target.value, "category")
          )
        }
      >
        {categories.map((item, index) => {
          let string = item.replace("-", " ");
          string = string[0].toUpperCase() + string.slice(1);
          return (
            <option key={index} value={item}>
              {string}
            </option>
          );
        })}
      </select>
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
