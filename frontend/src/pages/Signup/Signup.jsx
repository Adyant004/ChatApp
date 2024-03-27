import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",  
    })

    const { loading,signup } = useSignup();

    const handleSignUp = async(e) =>{
        e.preventDefault();
        await signup(inputs);
    }

    const onCheckboxSelect = (gender) => {
        setInputs({...inputs,gender:gender})
    }

  return (
    <div className="flex flex-col font-Reddit items-center justify-center mx-auto min-w-96">
      <div className="h-full p-3 w-full rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center" >
            Signup
        </h1>

        <form onSubmit={handleSignUp}>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Full Name</span>
                </label>
                <input value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value})} type="text" placeholder="Enter full name" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Username</span>
                </label>
                <input value={inputs.username} onChange={(e) => setInputs({...inputs,username: e.target.value})} type="text" placeholder="Enter username" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Password</span>
                </label>
                <input value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value})} type="password" placeholder="Enter password" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text" >Confirm Password</span>
                </label>
                <input value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value})} type="password" placeholder="Confirm password" className="w-full input input-bordered h-10" />
            </div>

            <GenderCheckbox onCheckboxSelect={onCheckboxSelect} selectedGender={inputs.gender} />
            <Link to="/login" className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block" >
                Already have an account?
            </Link>
            <div>
                <button disabled={loading} className="btn btn-block btn-sm mt-2" >
                    {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
