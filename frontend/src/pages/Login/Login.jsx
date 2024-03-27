import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const {loading,login} = useLogin();

  const handleLogin = async(e) => {
    e.preventDefault();
    await login(username,password);
  }

  return (
    <div className="flex flex-col font-Reddit items-center justify-center mx-auto min-w-96">
      <div className="h-full p-3 w-full rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center" >
            Login
        </h1>

        <form onSubmit={handleLogin}>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Username</span>
                </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Password</span>
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" className="w-full input input-bordered h-10" />
            </div>
            <Link to="/signup" className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block" >
                Don't have an account?
            </Link>
            <div>
                <button className="btn btn-block btn-sm mt-2" >
                {loading ? <span className='loading loading-spinner'></span> : "Login"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
