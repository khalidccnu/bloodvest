import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimesCircle } from "react-icons/fa";

const Nav = () => {
  const [hbMenu, setHbMenu] = useState(true);
  const [sm, setSM] = useState(true);
  const collapseHbMenu = useRef();

  const handleResize = (_) => {
    if (innerWidth >= 640) {
      setHbMenu(false);
      setSM(false);
    } else {
      setHbMenu(true);
      setSM(true);
    }
  };

  const handleCollapseHbMenu = ({ target: elem }) => {
    innerWidth < 640
      ? !collapseHbMenu.current.contains(elem) ||
        elem.classList.contains("nav-link")
        ? setHbMenu(true)
        : null
      : null;
  };

  useEffect(() => {
    addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleCollapseHbMenu);

    handleResize();

    return () => {
      removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleCollapseHbMenu);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 bg-sky-50 w-full py-2 z-30"
      ref={collapseHbMenu}
    >
      <div className="relative container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/lg-bloodvest.svg" alt="" className="w-[5rem]" />
          </Link>
          <div className="flex flex-row-reverse sm:flex-row items-center sm:space-x-5">
            {!sm ? (
              <ul className="flex space-x-3">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      "relative block " +
                      (isActive
                        ? "after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black hover:after:w-0 after:transition-[width] after:duration-500"
                        : "hover:text-pink-600")
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/find-blood"
                    className={({ isActive }) =>
                      "relative block " +
                      (isActive
                        ? "after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black hover:after:w-0 after:transition-[width] after:duration-500"
                        : "hover:text-pink-600")
                    }
                  >
                    Find Blood
                  </NavLink>
                </li>
              </ul>
            ) : (
              <span
                className="ml-5 hover:text-pink-600 cursor-pointer"
                onClick={(_) => setHbMenu(!hbMenu)}
              >
                {hbMenu ? (
                  <FaBars className="h-6" />
                ) : (
                  <FaTimesCircle className="h-6" />
                )}
              </span>
            )}
            <button className="btn btn-xs btn-outline min-w-[8rem]">
              Log In
            </button>
          </div>
        </div>
        {sm ? (
          <div
            className={`absolute ${
              hbMenu ? "-top-52 max-h-0" : "top-12 max-h-96"
            } left-0 w-full overflow-hidden transition-[max-height] duration-500`}
          >
            <ul className="flex flex-col bg-sky-50 px-6 py-3 space-y-3">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link relative inline-block pb-0.5 " +
                    (isActive
                      ? "after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black hover:after:w-0 after:transition-[width] after:duration-500"
                      : "hover:text-pink-600")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/find-blood"
                  className={({ isActive }) =>
                    "nav-link relative inline-block pb-0.5 " +
                    (isActive
                      ? "after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black hover:after:w-0 after:transition-[width] after:duration-500"
                      : "hover:text-pink-600")
                  }
                >
                  Find Blood
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;
