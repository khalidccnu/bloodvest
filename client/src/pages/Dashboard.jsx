import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import {
  FaAngleLeft,
  FaHandsHelping,
  FaLocationArrow,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import useAuth from "../hooks/useAuth.js";
import useUserInfo from "../hooks/useUserInfo.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const [, userInfo] = useUserInfo();
  const [hbMenu, setHbMenu] = useState(true);

  const handleLogout = (_) =>
    logOut()
      .then((_) => sessionStorage.removeItem("_vu"))
      .then((_) => navigate("/login"));

  const handleResize = (_) => {
    if (innerWidth >= 768) setHbMenu(false);
    else setHbMenu(true);
  };

  useEffect(() => {
    handleResize();

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="pt-28 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[18rem_auto]">
        <div
          className={`fixed md:static ${
            hbMenu ? "-left-96" : "left-0"
          } top-0 w-72 md:w-auto h-full md:h-auto md:min-h-screen p-5 pt-28 md:-mt-28 md:-mb-10 bg-gray-50 z-10 transition-[left] duration-500`}
        >
          <FaAngleLeft
            className="md:hidden text-2xl mb-5 cursor-pointer"
            onClick={(_) => setHbMenu(true)}
          />
          <div className="md:sticky md:top-28">
            <figure className="w-20 h-20 rounded-full mx-auto overflow-hidden">
              <img src={userInfo?.photo} alt="" />
            </figure>
            <h2 className="font-bold text-center mt-3">
              {userInfo?.firstName}
            </h2>
            <ul className="flex flex-col bg-gray-200 p-5 mt-5 rounded space-y-3">
              <li>
                <NavLink
                  to="overview"
                  className={({ isActive }) =>
                    "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-cyan-600 hover:text-white")
                  }
                >
                  <MdDashboard />
                  <span>Overview</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-cyan-600 hover:text-white")
                  }
                >
                  <FaUser />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="address"
                  className={({ isActive }) =>
                    "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-cyan-600 hover:text-white")
                  }
                >
                  <FaLocationArrow />
                  <span>Address</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="donate"
                  className={({ isActive }) =>
                    "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
                    (isActive
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-cyan-600 hover:text-white")
                  }
                >
                  <FaHandsHelping />
                  <span>Donate</span>
                </NavLink>
              </li>
              <li>
                <span
                  className="flex px-2 py-1 leading-5 gap-1 rounded hover:bg-cyan-600 hover:text-white cursor-pointer transition-colors duration-500"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <CgMenuLeft
            className="md:hidden text-lg mb-5 cursor-pointer"
            onClick={(_) => setHbMenu(false)}
          />
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
