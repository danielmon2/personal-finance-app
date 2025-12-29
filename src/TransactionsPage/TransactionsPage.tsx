import { useSearchParams } from "react-router-dom";

import TransactionListOptions from "./TransactionListOptions/TransactionListOptions";
import "./TransactionPage.css";

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
  // Return same params if there's no change
  const newParams = standarizeSearchParams(searchParams);

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
    <main className="page page--primary">
      <h1>Transactions</h1>
      <section className="trans-list trans-list--primary">
        <TransactionListOptions
          searchParams={newParams}
          setSearchParams={setSearchParams}
          sorting={SORTING}
          categories={CATEGORIES}
        />
        <ul>
          {transactionArr.map((transactionItem, index) => (
            <article
              className="trans-list__item trans-list__item--primary"
              key={index}
            >
              <img
                className="trans-list__item__avatar"
                src={transactionItem.avatar}
              />
              <div>
                <p className="font--bold">{transactionItem.name}</p>
                <p className="font--grey">{transactionItem.category}</p>
              </div>
              <div className="margin-left--auto">
                <p className="text-align--rigth font--bold">
                  {transactionItem.amount}
                </p>
                <p className="font--grey">{formatDate(transactionItem.date)}</p>
              </div>
            </article>
          ))}
        </ul>
      </section>
    </main>
  );
}

function standarizeSearchParams(
  searchParams: URLSearchParams
): URLSearchParams {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const key of newSearchParams.keys()) {
    if (!URL_PARAMETERS.includes(key)) {
      newSearchParams.delete(key);
    }
  }

  for (const [key, value] of newSearchParams.entries()) {
    if (!SORTING.includes(value) && !CATEGORIES.includes(value)) {
      newSearchParams.delete(key);
    }
  }

  return newSearchParams;
}

function searchTransactions(
  arr: DataTransaction,
  search: string
): DataTransaction {
  return arr.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );
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
