import React, { useEffect, useState } from "react";
import axios from "axios";
import Donor from "./Donor.jsx";

const Donors = () => {
  const [isLoading, setLoading] = useState(true);
  const [donors, setDonors] = useState([]);

  const donorsShuffle = (donors) => {
    let currentIndex = donors.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [donors[currentIndex], donors[randomIndex]] = [
        donors[randomIndex],
        donors[currentIndex],
      ];
    }

    return donors;
  };

  useEffect((_) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/donors`)
      .then((response) => {
        const shuffle = donorsShuffle(response.data).slice(0, 4);
        setDonors(shuffle);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <h3 className="text-2xl font-semibold text-center mb-5">
          Do<span className="text-red-600 font-bold">n</span>or
        </h3>
        {!isLoading ? (
          donors.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
              {donors.map((donor) => (
                <Donor key={donor._id} donor={donor} />
              ))}
            </div>
          ) : (
            <div className="alert max-w-sm mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>There is no donor!</span>
            </div>
          )
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

export default Donors;
