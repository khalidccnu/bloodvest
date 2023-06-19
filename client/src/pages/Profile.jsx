import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import useUserInfo from "../hooks/useUserInfo.js";
import useAxiosIns from "../hooks/useAxiosIns.js";

const Profile = () => {
  const [isLoading, setLoading] = useState(false);
  const [isViewMode, setViewMode] = useState(true);
  const axiosIns = useAxiosIns();
  const [, userInfo, setUserInfoRefetch] = useUserInfo();
  let { _id: id, firstName, lastName, phone } = userInfo ?? {};

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    onSubmit: (values) => {
      const { firstName, lastName, phone } = values;

      if (!firstName || !lastName || !phone) {
        toast.error("All fields are required!");
        return false;
      } else if (firstName.length > 15) {
        toast.error("First name must be 15 characters or less!");
        return false;
      } else if (lastName.length > 15) {
        toast.error("Last name must be 15 characters or less!");
        return false;
      } else if (isNaN(phone)) {
        toast.error("Phone must be numbers!");
        return false;
      } else if (phone.length !== 10) {
        toast.error("Phone must be 10 numbers!");
        return false;
      }

      setLoading(true);
      values.phone = "+880" + values.phone;

      axiosIns
        .put(`/users/${id}`, values)
        .then((_) => {
          toast.success("Data has been updated!");
          setUserInfoRefetch(true);
          setLoading(false);
        })
        .catch((_) => {
          toast.error("Something went wrong!");
          setLoading(false);
        });
    },
  });

  useEffect(
    (_) => {
      if (userInfo) {
        if (phone) phone = phone.replace("+880", "");

        formik.setValues({
          firstName,
          lastName,
          phone,
        });
      }
    },
    [userInfo]
  );

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5 text-end">
        {isViewMode ? (
          <FaEdit
            className="inline-block hover:text-cyan-600 cursor-pointer"
            onClick={(_) => setViewMode(false)}
          />
        ) : (
          <FaCheckCircle
            className="inline-block hover:text-cyan-600 cursor-pointer"
            onClick={(_) => setViewMode(true)}
          />
        )}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="form-control grid grid-cols-1 gap-4"
      >
        <div className="flex items-center gap-0.5">
          <h5 className="font-semibold min-w-[7rem]">First Name: </h5>
          {isViewMode ? (
            <span className="font-medium">{firstName}</span>
          ) : (
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="input input-sm input-bordered rounded w-full"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <h5 className="font-semibold min-w-[7rem]">Last Name: </h5>
          {isViewMode ? (
            <span className="font-medium">{lastName || "N/A"}</span>
          ) : (
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="input input-sm input-bordered rounded w-full"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <h5 className="font-semibold min-w-[7rem]">Phone: </h5>
          {isViewMode ? (
            <span className="font-medium">{phone || "N/A"}</span>
          ) : (
            <div className="join w-full">
              <span className="join-item input input-sm input-bordered rounded-l">
                +880
              </span>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                className="join-item input input-sm input-bordered rounded-r w-full"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
          )}
        </div>
        {!isViewMode ? (
          <button
            type="submit"
            className="btn btn-sm w-full bg-cyan-600 hover:bg-transparent text-white hover:text-cyan-600 !border-cyan-600 rounded normal-case"
          >
            <span>Update</span>
            {isLoading ? (
              <span
                className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full ml-1 animate-spin"
                role="status"
              ></span>
            ) : null}
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default Profile;
