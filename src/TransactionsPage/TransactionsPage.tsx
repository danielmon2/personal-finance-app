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
  // Handle errors
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "latest",
    category: "all",
  });
  let transactionArr = data.transactions;

  // Standarize search params
  console.log(searchParams);

  if (searchParams.get("category") !== null) {
    const category = searchParams.get("category") as string;
    transactionArr = filterTransactionsByCategory(transactionArr, category);
  }
  if (searchParams.get("sort") !== null) {
    const sort = searchParams.get("sort") as string;
    transactionArr = sortTransactions(transactionArr, sort);
  }
  if (searchParams.get("search") !== null) {
    const search = searchParams.get("search") as string;
    transactionArr = searchTransactions(transactionArr, search);
  }

  return (
    <main>
      <h1>Transactions</h1>
      <section>
        <div>
          <input
            placeholder="Search transactions"
            onChange={(e) =>
              setSearchParams(
                newSearchParams(
                  searchParams,
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
              searchParams.get("sort") === null
                ? "latest"
                : searchParams.get("sort")
            }
            onChange={(e) =>
              setSearchParams(
                newSearchParams(
                  searchParams,
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
            defaultValue={searchParams.get("category")}
            onChange={(e) =>
              setSearchParams(
                newSearchParams(
                  searchParams,
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
function searchTransactions(
  arr: DataTransaction,
  search: string
): DataTransaction {
  return arr.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );
}

function newSearchParams(
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
