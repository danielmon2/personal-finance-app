import type { DataTransaction } from "../TransactionsPage";
import "./TransactionList.css";

type TransactionListProps = {
  transactionArr: DataTransaction;
};

function TransactionList({ transactionArr }: TransactionListProps) {
  return (
    <ul className="trans-list">
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
            <p className="text--grey">{transactionItem.category}</p>
          </div>
          <div className="margin-left--auto">
            <p
              className={
                "text-align--rigth font--bold" +
                (transactionItem.amount > 0 ? " green-text" : "")
              }
            >
              {formatMoney(transactionItem.amount)}
            </p>
            <p className="text--grey">{formatDate(transactionItem.date)}</p>
          </div>
        </article>
      ))}
    </ul>
  );
}

function formatMoney(amount: number): string {
  if (amount > 0) {
    return `+$${amount}`;
  } else {
    return `-$${Math.abs(amount)}`;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default TransactionList;
