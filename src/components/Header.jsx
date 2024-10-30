import { initDrawers, initPopovers } from "flowbite";
import { Auth, SignOut } from "../lib/Init";

export default function Header({ isSignedIn }) {
  // initPopovers();
  initDrawers();
  const handleAuthClick = () => {
    Auth()
      .then(() => {
        console.log("Successfully logged in!");
      })
      .catch((error) => {
        console.log("Error logging in:", error);
      });
  };

  const handleSignOutClick = () => {
    SignOut().then(() => {
      console.log("Successfully logged out!");
    });
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href=""
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Money Tracker
          </span>
        </a>
        <div className="w-full block sm:w-auto mt-2 sm:mt-0" id="navbar-default">
          <button
            type="button"
            className="md:w-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={isSignedIn ? handleSignOutClick : handleAuthClick}
          >
            {isSignedIn ? "Keluar" : "Masuk"}
          </button>
        </div>
      </div>
    </nav>
  );
}
