import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUser } from "react-icons/fa";

const Donor = ({ donor }) => {
  const { _id: id, firstName, lastName, phone, bGroup, photo } = donor;
  const navigate = useNavigate();

  return (
    <div className="card bg-gray-50">
      <figure className="px-10 pt-10">
        {photo ? (
          <img src={photo} alt="" className="rounded-xl" />
        ) : (
          <FaUser className="text-4xl rounded-xl" />
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg">{firstName + " " + lastName}</h2>
        <p className="flex items-center space-x-1">
          <FaPhoneAlt />
          <span>{phone}</span>
        </p>
        <p>Blood Group: {bGroup}</p>
      </div>
      <div className="flex justify-center px-10 pb-10">
        <button
          type="button"
          className="btn btn-sm bg-cyan-600 hover:bg-transparent text-white hover:text-cyan-600 !border-cyan-600 rounded normal-case"
          onClick={(_) => navigate("/donors?id=" + id)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Donor;
