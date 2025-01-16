import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const { setUserInfo } = useContext(UserContext);

  const loginFn = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:5000/loginFn", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        setError(errorMessage.error);
        return;
      }

      const userData = await response.json();
      console.log(userData);
      setRedirect(true);
      setUserInfo(userData);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-1/2 flex flex-col gap-8">
      <p className="font-bold text-2xl">Sign in to Dblogs</p>

      <button className="font-semibold border-solid border-2 border-gray-400 w-full p-4 rounded-3xl">
        Sign in with Google
      </button>
      <p className="text-center">or sign in with email</p>
      <form className="flex flex-col gap-2 mt-10" onSubmit={loginFn}>
        <label htmlFor="email" className="font-semibold text-xl">
          Username or Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-200 p-5 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="font-semibold text-xl mt-4">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-200 p-5 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-gray-950 text-white p-5 rounded-3xl mt-5">
          Sign In
        </button>
      </form>
      <p>
        Create a new account here{" "}
        <Link to={"/register"} className="underline">
          Register
        </Link>{" "}
      </p>
    </div>
  );
};
