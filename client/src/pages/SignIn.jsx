import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const api_url = "http://localhost:8000";
  const [formData, setFormData] = useState({});

  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("Please fill out all the fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`${api_url}/api/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* Left side */}
        <div className="flex-1">
          <Link
            to="/"
            className=" whitespace-nowrap text-2xl font-bold dark:text-white "
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-4xl">
              Alfred's{" "}
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            This Alfred's official blog page.{" "}
            <span>
              You can sign in with your email and password or{" "}
              <span className="text-red-600 font-semibold">
                <span className="text-blue-600">G</span>
                <span>o</span>
                <span className="text-yellow-600">o</span>
                <span className="text-blue-600">g</span>
                <span className="text-green-600">l</span>
                <span>e</span>
              </span>
              .
            </span>
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="w-full mt-5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {successMessage && (
            <Alert className="mt-5 transition-all" color="success">
              {successMessage}
            </Alert>
          )}
          {/* {errorMessage && (
            <Alert className=" mt-5 transition-all" color="failure">
              {errorMessage}
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
