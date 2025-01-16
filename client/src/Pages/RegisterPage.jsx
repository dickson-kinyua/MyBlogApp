import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <div className="w-1/2 flex flex-col gap-10 mt-32">
            <p className="font-bold text-2xl">Sign up to Dblogs</p>

            <button className="font-semibold border-solid border-2 
            bg-gray-950 text-white border-gray-400 w-full p-6 rounded-3xl">Sign up with Google</button>
            <p className="text-center">or</p>
            <Link to={"/registerForm"} className="border-solid border-2 border-gray-300 p-4 rounded-2xl text-center" >Continue with email</Link>

        </div>
    );
}