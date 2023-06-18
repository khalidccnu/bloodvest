import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "./useAuth.js";

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosIns = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(
    (_) => {
      axiosIns.interceptors.request.use((config) => {
        const token = localStorage.getItem("_at");

        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
      });

      axiosIns.interceptors.response.use(
        (res) => res,
        async (err) => {
          if (
            err.config &&
            !err.config.isRetryRequest &&
            err.response &&
            [401, 403].includes(err.response.status)
          ) {
            await logOut()
              .then((_) => sessionStorage.removeItem("_vu"))
              .then((_) => {
                navigate("/login");
                err.config.isRetryRequest = true;
                toast.error(err.response.data.message);
              });
          }

          return Promise.reject(err);
        }
      );
    },
    [logOut, navigate, axiosIns]
  );

  return axiosIns;
};

export default useAxiosIns;
