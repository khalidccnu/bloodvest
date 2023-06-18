import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";
import bnLogin from "../assets/bn-login.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setLoading, signInWithEP, signInWithGoogle } = useAuth();
  const fromURL = location.state?.fromURL.pathname;

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

      signInWithEP(email, password)
        .then((_) => navigate(fromURL || "/dashboard"))
        .catch((err) => {
          setLoading(false);

          if (err.message === "Firebase: Error (auth/wrong-password).")
            toast.error("Incorrect password!");
          else if (err.message === "Firebase: Error (auth/user-not-found).")
            toast.error("User not found!");
        });
    },
  });

  const handleLoginWithGoogle = (_) => {
    signInWithGoogle()
      .then((_) => navigate(fromURL || "/dashboard"))
      .catch((_) => setLoading(false));
  };

  useEffect((_) => {
    if (fromURL)
      toast.error(
        "Only registered user can access this page. Please, login first!"
      );
  }, []);

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
              <span>Login</span>
              {isLoading ? (
                <span
                  className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full ml-1 animate-spin"
                  role="status"
                ></span>
              ) : null}
            </button>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
              <span>New to BloodVest?</span>
              <Link to="/signup" className="text-cyan-600">
                Create New Account
              </Link>
            </div>
            <div className="divider">or</div>
            <div
              className="flex justify-center items-center p-2 border hover:text-cyan-600 cursor-pointer space-x-2 transition-[color] duration-500"
              onClick={handleLoginWithGoogle}
            >
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
