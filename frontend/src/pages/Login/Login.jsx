import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col font-Reddit items-center justify-center mx-auto min-w-96">
      <div className="h-full p-3 w-full rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center" >
            Login
        </h1>

        <form>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Username</span>
                </label>
                <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Password</span>
                </label>
                <input type="text" placeholder="Enter password" className="w-full input input-bordered h-10" />
            </div>
            <a href="#" className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block" >
                Don't have an account?
            </a>
            <div>
                <button className="btn btn-block btn-sm mt-2" >Login</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
