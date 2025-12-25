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

function TransactionsPage() {
  // Add default
  const [searchParams, setSearchParams] = useSearchParams();
  let transactionArr = data.transactions;

  if (searchParams.get("category") !== null) {
    const category = searchParams.get("category") as string;
    transactionArr = filterTransactionsByCategory(transactionArr, category);
  }
  if (searchParams.get("sort") !== null) {
    const sort = searchParams.get("sort") as string;
    transactionArr = sortTransactions(transactionArr, sort);
  }

  return (
    <main>
      <h1>Transactions</h1>
      <section>
        <div>
          <select
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
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
          <select
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
            <option value="all">All transactions</option>
            <option value="dining-out">Dining Out</option>
            <option value="general">General</option>
            <option value="groceries">Groceries</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="personal-care">Personal Care</option>
            <option value="education">Education</option>
            <option value="bills">Bills</option>
            <option value="shopping">Shopping</option>
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
