import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/signin"; // Redirect to the sign-in page after sign-out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
