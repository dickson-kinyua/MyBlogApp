import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const RegisterForm = () => {
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const registerFn = async (e) => {
    e.preventDefault();
    setError(null);

    const data = { fullNames, email, password };

    try {
      const response = await fetch("http://localhost:5000/registerFn", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
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
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full">
      <p className="font-bold text-2xl">Sign up to Dblogs</p>
      <form className="flex flex-col gap-2 mt-10 " onSubmit={registerFn}>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="username" className="font-semibold text-xl">
              FullNames:
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-200 p-5 rounded-xl"
              value={fullNames}
              onChange={(e) => setFullNames(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="email" className="font-semibold text-xl">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-200 p-5 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="password" className="font-semibold text-xl mt-4">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-200 p-5 rounded-xl"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-gray-950 text-white p-5 rounded-3xl mt-5">
          Create Account
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to={"/login"} className="underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
