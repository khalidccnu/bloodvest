import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaLocationArrow, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";

const ViewDonor = () => {
  const [params] = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [donor, setDonor] = useState(null);

  useEffect((_) => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/users/donors?id=${params.get("id")}`
      )
      .then((response) => {
        setDonor(response.data[0]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="pt-28 pb-10">
      <div className="container">
        {!isLoading ? (
          <div className="card bg-gray-50 w-fit mx-auto">
            <figure className="px-10 pt-10">
              {donor?.photo ? (
                <img src={donor?.photo} alt="" className="rounded-xl" />
              ) : (
                <FaUser className="text-4xl rounded-xl" />
              )}
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg">
                {donor?.firstName + " " + donor?.lastName}
              </h2>
              <p className="flex items-center space-x-1">
                <FaPhoneAlt />
                <span>{donor?.phone}</span>
              </p>
              <p>Blood Group: {donor?.bGroup}</p>
              <p className="flex items-center space-x-1">
                <FaLocationArrow />
                <span>
                  {donor?.addressPrivacy ? (
                    <FaLock />
                  ) : (
                    donor?.street +
                    ", " +
                    donor?.district +
                    ", " +
                    donor?.division
                  )}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <span
              className="inline-block h-6 w-6 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewDonor;
