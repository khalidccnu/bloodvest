import React from "react";
import imgT1 from "../assets/team/img-t1.jpg";
import imgT2 from "../assets/team/img-t2.jpg";
import imgT3 from "../assets/team/img-t3.png";
import imgT4 from "../assets/team/img-t4.jpg";

const Team = () => {
  return (
    <section className="pb-10">
      <div className="container">
        <h3 className="text-2xl font-semibold text-center mb-5">
          Te<span className="text-red-600 font-bold">a</span>m
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="card bg-gray-50">
            <figure className="px-10 pt-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT1}
                alt=""
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg">Tajul G.</h2>
              <p className="text-gray-500">CEO</p>
            </div>
          </div>
          <div className="card bg-gray-50">
            <figure className="px-10 pt-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT2}
                alt=""
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg">Rah. K.</h2>
              <p className="text-gray-500">Manager</p>
            </div>
          </div>
          <div className="card bg-gray-50">
            <figure className="px-10 pt-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT3}
                alt=""
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg">Arsalan</h2>
              <p className="text-gray-500">Employer</p>
            </div>
          </div>
          <div className="card bg-gray-50">
            <figure className="px-10 pt-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT4}
                alt=""
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg">Bonnie Green</h2>
              <p className="text-gray-500">Employer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
