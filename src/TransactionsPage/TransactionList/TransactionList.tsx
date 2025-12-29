import type { DataTransaction } from "../TransactionsPage";

type TransactionListProps = {
  transactionArr: DataTransaction;
};

function TransactionList({ transactionArr }: TransactionListProps) {
  return (
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

export default TransactionList;
