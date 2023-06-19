import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";

const ManageUser = ({ handleAdmin, user }) => {
  const { _id: id, firstName, lastName, email, photo, isAdmin } = user;
  const navigate = useNavigate();

  return (
    <div className="card bg-gray-50">
      <figure className="px-10 pt-10">
        <img src={photo} alt="" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg">{firstName + " " + lastName}</h2>
        <p>{email}</p>
      </div>
      <div className="flex justify-between px-10 pb-10">
        <button
          type="button"
          className="btn btn-sm bg-cyan-600 hover:bg-transparent text-white hover:text-cyan-600 !border-cyan-600 rounded normal-case"
          onClick={(_) => navigate("/users?id=" + id)}
        >
          View
        </button>
        <div className="join rounded">
          <button
            className={`title btn btn-sm ${
              !isAdmin ? "btn-disabled" : ""
            } join-item`}
            data-tooltip-content="Make User"
            onClick={(_) => handleAdmin(id, firstName, false)}
          >
            <FaUser />
          </button>
          <button
            className={`title btn btn-sm ${
              isAdmin ? "btn-disabled" : ""
            } join-item`}
            data-tooltip-content="Make Admin"
            onClick={(_) => handleAdmin(id, firstName, true)}
          >
            <GrUserSettings />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
