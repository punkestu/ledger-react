import { useState } from "react";
import Success from "./Success";
import { TransferBalance } from "../lib/Sheet";
import { initDropdowns } from "flowbite";

export default function Transfer({ listWallet }) {
  initDropdowns();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [nominal, setNominal] = useState("");
  const [admin, setAdmin] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  function simpan() {
    if (!from || !to) {
      alert("Pilih wallet dulu");
      return;
    }
    if (!nominal) {
      alert("Isi nominal");
      return;
    }
    setIsMutating(true);
    TransferBalance({ from, to, nominal, admin }).then(() => {
      setFrom(null);
      setTo(null);
      setNominal(null);
      setAdmin(null);

      setShowModal(true);
      setIsMutating(false);
    });
  }

  return (
    <>
      <Success show={[showModal, setShowModal]} />
      <div className="flex flex-col gap-4 p-4 border drop-shadow-sm rounded-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Transfer Wallet</h1>
        </div>
        <div className="flex xs:flex-row flex-col gap-2">
          <div className="relative flex-grow">
            <button
              id="dropdownSearchFromButton"
              data-dropdown-toggle="dropdownSearchFrom"
              data-dropdown-placement="bottom"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {from ? from.title : "Dari"}
              <svg
                className="w-2.5 h-2.5 ms-3"
               aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownSearchFrom"
              className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
            >
              <div className="p-3">
                <label htmlFor="input-group-search-from" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                     aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search-from"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search user"
                    onChange={(e) => setSearchFrom(e.target.value)}
                    value={searchFrom}
                  />
                </div>
              </div>
              <ul
                className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchFromButton"
              >
                {listWallet
                  .filter((wallet) =>
                    wallet.properties.title
                      .toLowerCase()
                      .includes(searchFrom.toLowerCase())
                  )
                  .map((wallet) => (
                    <li key={wallet.properties.index}>
                      <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          data-dropdown-hide="dropdownSearchFrom"
                          id={`radio-item-from-${wallet.properties.index}`}
                          type="radio"
                          name="wallet"
                          onChange={() => setFrom(wallet.properties)}
                          value={wallet.properties.title}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={`radio-item-from-${wallet.properties.index}`}
                          className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          {wallet.properties.title}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="relative flex-grow">
            <button
              id="dropdownSearchToButton"
              data-dropdown-toggle="dropdownSearchTo"
              data-dropdown-placement="bottom"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {to ? to.title : "Ke"}
              <svg
                className="w-2.5 h-2.5 ms-3"
               aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdownSearchTo"
              className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
            >
              <div className="p-3">
                <label htmlFor="input-group-search-to" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                     aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search-to"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search user"
                    onChange={(e) => setSearchTo(e.target.value)}
                    value={searchTo}
                  />
                </div>
              </div>
              <ul
                className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchToButton"
              >
                {listWallet
                  .filter((wallet) =>
                    wallet.properties.title
                      .toLowerCase()
                      .includes(searchTo.toLowerCase())
                  )
                  .map((wallet) => (
                    <li key={wallet.properties.index}>
                      <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id={`radio-item-to-${wallet.properties.index}`}
                          type="radio"
                          name="wallet"
                          onChange={() => setTo(wallet.properties)}
                          value={wallet.properties.title}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={`radio-item-to-${wallet.properties.index}`}
                          className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          {wallet.properties.title}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="nominal-input"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nominal
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
               aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </div>
            <input
              type="number"
              id="nominal-input"
              className="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Nominal"
              onChange={(e) => setNominal(e.target.value)}
              value={nominal}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="admin-input"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Admin
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
               aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </div>
            <input
              type="number"
              id="admin-input"
              className="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Admin"
              onChange={(e) => setAdmin(e.target.value)}
              value={admin}
              required
            />
          </div>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2 flex justify-center"
          onClick={simpan}
        >
          {isMutating ? (
            <svg
             aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            "Simpan"
          )}
        </button>
      </div>
    </>
  );
}
