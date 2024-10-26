import { Auth, SignOut } from "../lib/Init";
import { Navbar, Button } from "flowbite-react";

export default function Header({ isSignedIn }) {
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
    <Navbar fluid rounded>
      <Navbar.Brand href="">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Ledger
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {isSignedIn ? (
          <Button color="blue" size="xs" onClick={handleSignOutClick}>
            Sign out
          </Button>
        ) : (
          <Button color="blue" size="xs" onClick={handleAuthClick}>
            Sign in
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
