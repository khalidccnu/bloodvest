import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import axios from "axios";
import useUserInfo from "../hooks/useUserInfo.js";
import useAxiosIns from "../hooks/useAxiosIns.js";

const Address = () => {
  const [isLoading, setLoading] = useState(false);
  const [isViewMode, setViewMode] = useState(true);
  const axiosIns = useAxiosIns();
  const [, userInfo, setUserInfoRefetch] = useUserInfo();
  let { _id: id, division, district, street, postalCode } = userInfo ?? {};
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const formik = useFormik({
    initialValues: {
      division: "",
      district: "",
      street: "",
      postalCode: "",
    },
    onSubmit: (values) => {
      const { division, district, street, postalCode } = values;

      if (!division || !district || !street || !postalCode) {
        toast.error("All fields are required!");
        return false;
      } else if (isNaN(postalCode)) {
        toast.error("Postal code must be numbers!");
        return false;
      }

      setLoading(true);

      axiosIns
        .put(`/self/users/${id}`, values)
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

  const handleDistrict = (division) => {
    axios(`/districts.json`).then((response) => {
      const filterDistricts = response.data.filter(
        (district) => district.division === division
      );

      setDistricts(filterDistricts);
    });
  };

  useEffect((_) => {
    axios(`/divisions.json`).then((response) => setDivisions(response.data));
  }, []);

  useEffect(
    (_) => {
      formik.values.division ? handleDistrict(formik.values.division) : null;
    },
    [formik.values.division]
  );

  useEffect(
    (_) => {
      if (userInfo) {
        formik.setValues({
          division,
          district,
          street,
          postalCode,
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
          <h5 className="font-semibold min-w-[7rem]">Division: </h5>
          {isViewMode ? (
            <span className="font-medium">{division || "N/A"}</span>
          ) : (
            <select
              name="division"
              className="select select-sm select-bordered rounded w-full shrink"
              value={formik.values.division}
              onChange={formik.handleChange}
            >
              {divisions.map((division, idx) => (
                <option key={idx} value={division.name}>
                  {division.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <h5 className="font-semibold min-w-[7rem]">District: </h5>
          {isViewMode ? (
            <span className="font-medium">{district || "N/A"}</span>
          ) : (
            <select
              name="district"
              className="select select-sm select-bordered rounded w-full shrink"
              value={formik.values.district}
              onChange={formik.handleChange}
            >
              {districts.map((district, idx) => (
                <option key={idx} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <h5 className="font-semibold min-w-[7rem]">Street: </h5>
          {isViewMode ? (
            <span className="font-medium">{street || "N/A"}</span>
          ) : (
            <textarea
              placeholder="Street Address"
              name="street"
              className="textarea textarea-sm textarea-bordered rounded w-full h-full resize-none"
              value={formik.values.street}
              onChange={formik.handleChange}
            ></textarea>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <h5 className="font-semibold min-w-[7rem]">Postal Code: </h5>
          {isViewMode ? (
            <span className="font-medium">{postalCode || "N/A"}</span>
          ) : (
            <input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              className="input input-sm input-bordered rounded w-full"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
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

export default Address;
