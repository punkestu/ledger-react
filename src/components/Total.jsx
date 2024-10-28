import { useEffect, useState } from "react";
import { GetLastTotal } from "../lib/Sheet";
import { subscribe } from "../lib/Queue";

export default function Total({ listWallet }) {
  const [totals, setTotals] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    if (listWallet.length) {
      refresh();
    }
  }, [listWallet]);

  subscribe((event) => {
    if (event === "update") {
      refresh();
    }
  });

  function refresh() {
    setIsRefreshing(true);
    Promise.all(
      listWallet.map(async (wallet) => {
        const lastTotal = await GetLastTotal(wallet.properties.title);
        return lastTotal;
      })
    )
      .then((totals) => {
        setTotals(totals);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }

  function format(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  function isBlock(wallet, yes, no) {
    return wallet.includes("-block") ? yes : no;
  }

  return (
    <div className="flex flex-col gap-4 p-4 border drop-shadow-sm rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Saldo Wallet</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2 flex justify-center"
          onClick={refresh}
        >
          {isRefreshing ? (
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
              />
            </svg>
          )}
        </button>
      </div>
      <p className="text-xl">
        <strong>Total: </strong>
        {format(
          totals.reduce((acc, total) => acc + (parseInt(total[5] || 0) || 0), 0)
        )}
      </p>
      <ul className="flex flex-wrap gap-2 overflow-x-auto max-h-[50vh]">
        {totals.map(
          (total, index) =>
            total[5] &&
            total[5] > 0 && (
              <li
                key={index}
                className={`flex-grow flex flex-col items-center p-6 ${isBlock(
                  listWallet[index].properties.title,
                  "bg-red-500",
                  "bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                )} border border-gray-200 rounded-lg shadow`}
              >
                <h5
                  className={`mb-2 text-2xl font-bold tracking-tight ${isBlock(
                    listWallet[index].properties.title,
                    "text-white dark:text-gray-900",
                    "text-gray-900 dark:text-white"
                  )}`}
                >
                  {listWallet[index].properties.title}
                </h5>
                <p
                  className={`font-normal ${isBlock(
                    listWallet[index].properties.title,
                    "text-white dark:text-gray-900",
                    "text-gray-700 dark:text-gray-400"
                  )}`}
                >
                  {format(total[5])}
                </p>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
