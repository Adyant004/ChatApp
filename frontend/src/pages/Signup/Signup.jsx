import React, { useRef, useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";

const Signup = () => {
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const profilePic = imgUrl;

  const imageRef = useRef(null);

  const { loading, signup } = useSignup();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(inputs,profilePic);
    setImgUrl('');
  };

  const onCheckboxSelect = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  return (
    <div className="flex flex-col font-Reddit items-center justify-center mx-auto min-w-96">
      <div className="h-full p-3 w-full rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center">Signup</h1>

        <form onSubmit={handleSignUp}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              type="text"
              placeholder="Enter full name"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="flex items-center mt-2">
            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              className="cursor-pointer"
            />
            <input
              type="file"
              ref={imageRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <label className="label p-2">
              <span className="text-base label-text">{imgUrl && 'Image Uploaded'}</span>
            </label>
          </div>

          <GenderCheckbox
            onCheckboxSelect={onCheckboxSelect}
            selectedGender={inputs.gender}
          />
          <Link
            to="/login"
            onClick={() => setImgUrl('')}
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button disabled={loading} className="btn btn-block btn-sm mt-2">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
