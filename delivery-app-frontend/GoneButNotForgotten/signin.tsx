// import { useState, type FormEvent } from "react";
// import { auth } from "../lib/firebase"; // Adjust the path to firebase.js as necessary
// import { signInWithEmailAndPassword } from "firebase/auth";

// const SignIn: React.FC = (): JSX.Element => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSignIn = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Firebase sign-in with email and password
//       await signInWithEmailAndPassword(auth, email, password);
//       // Redirect or handle successful login
//       window.location.href = "/dashboard"; // Adjust redirect as needed
//     } catch (error) {
//       setError("Invalid email or password");
//       console.error("Firebase sign-in error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? "Signing in..." : "Sign In"}
//         </button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default SignIn;
