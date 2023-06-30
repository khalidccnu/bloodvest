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
          <div className="bg-gray-50 rounded-2xl">
            <div className="flex flex-col items-center py-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT1}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium">Tajul G.</h5>
              <span className="text-sm text-gray-500">CEO</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl">
            <div className="flex flex-col items-center py-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT2}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium">Rah. K.</h5>
              <span className="text-sm text-gray-500">Manager</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl">
            <div className="flex flex-col items-center py-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT3}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium">Arsalan</h5>
              <span className="text-sm text-gray-500">Employer</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl">
            <div className="flex flex-col items-center py-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={imgT4}
                alt=""
              />
              <h5 className="mb-1 text-xl font-medium">Bonnie Green</h5>
              <span className="text-sm text-gray-500">Employer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
