import { useSearchParams } from "react-router-dom";

import data from "../data/data.json";

type DataTransaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}[];

const URL_PARAMETERS = ["sort", "category", "search"];

const CATEGORIES = [
  "all",
  "dining-out",
  "general",
  "groceries",
  "entertainment",
  "transportation",
  "lifestyle",
  "personal-care",
  "education",
  "bills",
  "shopping",
];

const SORTING = ["latest", "oldest", "az", "za", "highest", "lowest"];

function TransactionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  let transactionArr = data.transactions;

  // Standarize search params
  let newParams = standarizeSearchParams(searchParams);
  if (newParams !== null) {
    console.log(newParams);
  } else {
    newParams = new URLSearchParams(searchParams);
  }

  if (newParams.get("category") !== null) {
    const category = newParams.get("category") as string;
    transactionArr = filterTransactionsByCategory(transactionArr, category);
  }
  if (newParams.get("sort") !== null) {
    const sort = newParams.get("sort") as string;
    transactionArr = sortTransactions(transactionArr, sort);
  }
  if (newParams.get("search") !== null) {
    const search = newParams.get("search") as string;
    transactionArr = searchTransactions(transactionArr, search);
  }

  return (
    <main>
      <h1>Transactions</h1>
      <section>
        <div>
          <input
            defaultValue={""}
            placeholder="Search transactions"
            onChange={(e) =>
              setSearchParams(
                createNewSearchParams(
                  newParams,
                  e.target.value,
                  "search"
                ) as URLSearchParams
              )
            }
          ></input>
          <label htmlFor="sort-select">Sort by</label>
          <select
            id="sort-select"
            defaultValue={
              newParams.get("sort") === null
                ? "latest"
                : (newParams.get("sort") as string)
            }
            onChange={(e) =>
              setSearchParams(
                createNewSearchParams(
                  newParams,
                  e.target.value,
                  "sort"
                ) as URLSearchParams
              )
            }
          >
            {SORTING.map((item, index) => {
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
              newParams.get("category") === null
                ? "all"
                : (newParams.get("category") as string)
            }
            onChange={(e) =>
              setSearchParams(
                createNewSearchParams(
                  newParams,
                  e.target.value,
                  "category"
                ) as URLSearchParams
              )
            }
          >
            {CATEGORIES.map((item, index) => {
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
        <ul>
          {transactionArr.map((transactionItem, index) => (
            <article key={index}>
              <p>{transactionItem.name}</p>
              <p>{transactionItem.category}</p>
              <p>{formatDate(transactionItem.date)}</p>
              <p>{transactionItem.amount}</p>
            </article>
          ))}
        </ul>
      </section>
    </main>
  );
}

function standarizeSearchParams(
  searchParams: URLSearchParams
): URLSearchParams | null {
  const newSearchParams = new URLSearchParams(searchParams);
  let changed = false;
  for (const key of newSearchParams.keys()) {
    if (!URL_PARAMETERS.includes(key)) {
      newSearchParams.delete(key);
      changed = true;
    }
  }

  for (const [key, value] of newSearchParams.entries()) {
    if (!SORTING.includes(value) && !CATEGORIES.includes(value)) {
      newSearchParams.delete(key);
      changed = true;
    }
  }

  return changed ? newSearchParams : null;
}

function searchTransactions(
  arr: DataTransaction,
  search: string
): DataTransaction {
  return arr.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );
}

function createNewSearchParams(
  searchParams: URLSearchParams,
  value: string,
  type: string
): object {
  const newSearchParams = Object.fromEntries(searchParams);
  newSearchParams[type] = value;
  return newSearchParams;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// sorting func
function sortTransactions(arr: DataTransaction, sort: string): DataTransaction {
  // Time
  if (sort === "latest") {
    return arr.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } else if (sort === "oldest") {
    return arr.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }
  // Alphabet
  else if (sort === "az") {
    return arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (sort === "za") {
    return arr.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  }
  // Price
  else if (sort === "highest") {
    return arr.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
  } else if (sort === "lowest") {
    return arr.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
  }

  return arr;
}

// Filter func
function filterTransactionsByCategory(
  arr: DataTransaction,
  category: string
): DataTransaction {
  if (category === "all") {
    return arr;
  }
  return arr.filter(
    (item) => item.category.toLowerCase().replace(" ", "-") === category
  );
}

export default TransactionsPage;
