import { gapi } from "gapi-script";

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

export function Init({ setIsSignedIn, setIsSheetReady }, initCallback) {
  return () => {
    gapi.client
      .init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: SCOPES,
      })
      .then(async () => {
        console.log("GAPI client loaded for API");
        gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        setIsSignedIn(isSignedIn);
        await gapi.client.load("sheets", "v4").then(() => {
          console.log("GAPI client loaded for SHEETS API");
          setIsSheetReady(true);
        });
        if (initCallback) await initCallback();
      });
  };
}

export function Auth() {
  return gapi.auth2.getAuthInstance().signIn();
}

export function SignOut() {
  return gapi.auth2.getAuthInstance().signOut();
}
