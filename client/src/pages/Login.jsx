import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { FaGoogle } from "react-icons/fa";
import bnLogin from "../assets/bn-login.png";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const { email, password } = values;

      if (email === "" || password === "") {
        toast.error("All fields are required!");
        return false;
      }
    },
  });

  return (
    <section className="pt-28 pb-10">
      <div className="container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-sky-50 max-w-fit md:max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-6 rounded-2xl text-sm">
          <div className="max-w-xs">
            <img src={bnLogin} alt="" />
          </div>
          <form className="form-control gap-y-4" onSubmit={formik.handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-sm bg-transparent text-cyan-600 w-full px-0 border-0 border-b border-b-cyan-600 rounded-none focus:outline-0"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-sm bg-transparent text-cyan-600 w-full px-0 border-0 border-b border-b-cyan-600 rounded-none focus:outline-0"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button
              type="submit"
              className="btn btn-sm w-full bg-cyan-600 hover:bg-transparent text-white hover:text-cyan-600 !border-cyan-600 rounded normal-case"
            >
              Login
            </button>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
              <span>New to BloodVest?</span>
              <Link to="/signup" className="text-cyan-600">
                Create New Account
              </Link>
            </div>
            <div className="divider">or</div>
            <div className="flex justify-center items-center p-2 border hover:text-cyan-600 cursor-pointer space-x-2 transition-[color] duration-500">
              <FaGoogle className="text-xl" />
              <span>Continue with Google</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
