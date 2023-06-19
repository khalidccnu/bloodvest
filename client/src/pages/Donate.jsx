import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import useUserInfo from "../hooks/useUserInfo.js";
import useAxiosIns from "../hooks/useAxiosIns.js";

const Donate = () => {
  const [isLoading, setLoading] = useState(false);
  const [isViewMode, setViewMode] = useState(true);
  const axiosIns = useAxiosIns();
  const [, userInfo, setUserInfoRefetch] = useUserInfo();
  let { _id: id, donate, newDonor, lastDonate } = userInfo ?? {};
  const [isDonate, setDonate] = useState(false);
  const [isNewDonor, setNewDonor] = useState(true);

  const formik = useFormik({
    initialValues: {
      donate: false,
      newDonor: "",
      lastDonate: new Date(),
    },
    onSubmit: (values) => {
      const { donate, newDonor, lastDonate } = values;

      if (
        (donate && !newDonor) ||
        (donate && newDonor === "no" && !lastDonate)
      ) {
        toast.error("All fields are required!");
        return false;
      }

      setLoading(true);

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
        formik.setValues({
          donate,
          newDonor,
          lastDonate: new Date(lastDonate),
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
          <h5 className="font-semibold min-w-[7rem]">Donate: </h5>
          {isViewMode ? (
            <span className="font-medium">
              {donate === undefined ? "N/A" : donate ? "YES" : "NO"}
            </span>
          ) : (
            <label className="flex items-center input input-sm input-bordered rounded">
              <input
                type="checkbox"
                name="donate"
                className="checkbox checkbox-sm"
                onChange={formik.handleChange}
                onClick={(_) => {
                  setDonate(!isDonate);
                  setNewDonor(true);
                }}
                checked={formik.values.donate}
              />
            </label>
          )}
        </div>
        <div className={`${isDonate ? "flex" : "hidden"} items-center gap-0.5`}>
          <h5 className="font-semibold min-w-[7rem]">New Donor: </h5>
          {isViewMode ? (
            <span className="font-medium">
              {newDonor?.toUpperCase() || "N/A"}
            </span>
          ) : (
            <label className="flex items-center input input-sm input-bordered rounded space-x-2">
              <div className="flex">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="newDonor"
                    id="yes"
                    className="radio radio-sm"
                    value="yes"
                    onChange={formik.handleChange}
                    onClick={(_) => setNewDonor(true)}
                    checked={formik.values.newDonor === "yes"}
                  />
                  <label htmlFor="yes" className="label label-text">
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="newDonor"
                    id="no"
                    className="radio radio-sm"
                    value="no"
                    onChange={formik.handleChange}
                    onClick={(_) => setNewDonor(false)}
                    checked={formik.values.newDonor === "no"}
                  />
                  <label htmlFor="no" className="label label-text">
                    No
                  </label>
                </div>
              </div>
            </label>
          )}
        </div>
        <div
          className={`${isNewDonor ? "hidden" : "flex"} items-center gap-0.5`}
        >
          <h5 className="font-semibold min-w-[7rem]">Last Donate: </h5>
          {isViewMode ? (
            <span className="font-medium">
              {lastDonate ? new Date(lastDonate).toLocaleDateString() : "N/A"}
            </span>
          ) : (
            <DatePicker
              dateFormat="dd/MM/yyyy"
              name="lastDonate"
              className="input input-sm input-bordered rounded w-full"
              selected={formik.values.lastDonate}
              onChange={(date) => formik.setFieldValue("lastDonate", date)}
              closeOnScroll={true}
            />
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

export default Donate;
