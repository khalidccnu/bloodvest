import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";

const validateForm = (values) => {
  const errors = {};

  if (!values.firstName) errors.firstName = "Required";
  else if (values.firstName.length > 15)
    errors.firstName = "Must be 15 characters or less";

  if (!values.lastName) errors.lastName = "Required";
  else if (values.lastName.length > 15)
    errors.lastName = "Must be 15 characters or less";

  if (!values.phone) errors.phone = "Required";
  else if (isNaN(values.phone)) errors.phone = "Must be numbers";
  else if (values.phone.length !== 10) errors.phone = "Must be 10 numbers";

  if (!values.email) errors.email = "Required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Invalid email address";

  if (!values.birthDate) errors.birthDate = "Required";
  else if (new Date().getFullYear() - values.birthDate.getFullYear() < 15)
    errors.birthDate = "Must be 15 years old";

  if (!values.bGroup) errors.bGroup = "Required";

  if (!values.division) errors.division = "Required";

  if (!values.district) errors.district = "Required";

  if (!values.postalCode) errors.postalCode = "Required";
  else if (isNaN(values.postalCode)) errors.postalCode = "Must be numbers";

  if (!values.street) errors.street = "Required";

  if (values.donate && !values.newDonor) errors.newDonor = "Required";

  if (values.donate && values.newDonor === "no" && !values.lastDonate)
    errors.lastDonate = "Required";

  return errors;
};

const Signup = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isDonate, setDonate] = useState(false);
  const [isNewDonor, setNewDonor] = useState(true);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      birthDate: "",
      bGroup: "",
      division: "",
      district: "",
      postalCode: "",
      street: "",
      donate: false,
      newDonor: "",
      lastDonate: "",
    },
    validate: validateForm,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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

  return (
    <section
      className="relative bg-cover bg-no-repeat min-h-screen pt-28 pb-10"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/khalidccnu/tr:q-60/bloodvest/bg-signup.jpg')",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="relative container">
        <div className="flex flex-col gap-5 max-w-lg mx-auto bg-white p-5 sm:p-10 rounded">
          <div>
            <h3 className="font-bold text-lg text-cyan-600">Signup</h3>
            <small className="text-red-600">*All fields are required!</small>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form-control grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-0.5">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="input input-sm input-bordered rounded w-full"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.firstName}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="input input-sm input-bordered rounded w-full"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.lastName}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="join">
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
              {formik.errors.phone ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.phone}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-sm input-bordered rounded w-full"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.email}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Birth Date"
                name="birthDate"
                className="input input-sm input-bordered rounded w-full"
                selected={formik.values.birthDate}
                onChange={(date) => formik.setFieldValue("birthDate", date)}
                closeOnScroll={true}
              />
              {formik.errors.birthDate ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.birthDate}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <select
                name="bGroup"
                className="select select-sm select-bordered rounded w-full"
                value={formik.values.bGroup}
                onChange={formik.handleChange}
              >
                <option value="" disabled selected>
                  Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {formik.errors.bGroup ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.bGroup}
                </small>
              ) : null}
            </div>
            <input
              type="text"
              name="country"
              className="input input-sm input-bordered rounded w-full"
              value="Bangladesh"
              disabled={true}
            />
            <div className="flex flex-col gap-0.5">
              <select
                name="division"
                className="select select-sm select-bordered rounded w-full"
                value={formik.values.division}
                onChange={formik.handleChange}
              >
                <option value="" disabled selected>
                  Division
                </option>
                {divisions.map((division, idx) => (
                  <option
                    key={idx}
                    value={division.name}
                    onClick={(_) => handleDistrict(division.name)}
                  >
                    {division.name}
                  </option>
                ))}
              </select>
              {formik.errors.division ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.division}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <select
                  name="district"
                  className="select select-sm select-bordered rounded w-full"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled selected>
                    District
                  </option>
                  {districts.map((district, idx) => (
                    <option key={idx} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {formik.errors.district ? (
                  <small className="text-red-600 ml-0.5">
                    {formik.errors.district}
                  </small>
                ) : null}
              </div>
              <div className="flex flex-col gap-0.5">
                <input
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  className="input input-sm input-bordered rounded w-full"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                />
                {formik.errors.postalCode ? (
                  <small className="text-red-600 ml-0.5">
                    {formik.errors.postalCode}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <textarea
                placeholder="Street Address"
                name="street"
                className="textarea textarea-sm textarea-bordered rounded w-full h-full resize-none"
                value={formik.values.street}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.street ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.street}
                </small>
              ) : null}
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="flex justify-center gap-x-2 h-full label border rounded">
                <span className="label-text">Are you donate?</span>
                <input
                  type="checkbox"
                  name="donate"
                  className="checkbox checkbox-sm"
                  checked={formik.values.donate}
                  onChange={formik.handleChange}
                  onClick={(_) => {
                    setDonate(!isDonate);
                    setNewDonor(true);
                  }}
                />
              </label>
              {formik.errors.donate ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.donate}
                </small>
              ) : null}
            </div>
            <div className={`${isDonate ? "flex" : "hidden"} flex-col gap-0.5`}>
              <label className="flex justify-center gap-x-2 label border rounded">
                <span className="label-text">New Donor?</span>
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="newDonor"
                      id="yes"
                      className="radio radio-sm"
                      value="yes"
                      onChange={formik.handleChange}
                      onClick={(_) => setNewDonor(true)}
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
                    />
                    <label htmlFor="no" className="label label-text">
                      No
                    </label>
                  </div>
                </div>
              </label>
              {formik.errors.newDonor ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.newDonor}
                </small>
              ) : null}
            </div>
            <div
              className={`${isNewDonor ? "hidden" : "flex"} flex-col gap-0.5`}
            >
              <DatePicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Last Donate"
                name="lastDonate"
                className="input input-sm input-bordered rounded w-full"
                selected={formik.values.lastDonate}
                onChange={(date) => formik.setFieldValue("lastDonate", date)}
                closeOnScroll={true}
              />
              {formik.errors.lastDonate ? (
                <small className="text-red-600 ml-0.5">
                  {formik.errors.lastDonate}
                </small>
              ) : null}
            </div>
            <button
              type="submit"
              className={`${
                isDonate && isNewDonor ? "col-span-full" : "w-full h-full"
              } btn btn-sm bg-cyan-600 hover:bg-transparent text-white hover:text-cyan-600 !border-cyan-600 rounded normal-case`}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
