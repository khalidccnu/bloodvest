import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import useUserInfo from "../hooks/useUserInfo.js";
import useAxiosIns from "../hooks/useAxiosIns.js";
import ManageUser from "../components/ManageUser.jsx";

const ManageUsers = () => {
  const location = useLocation();
  let { page } = queryString.parse(location.search);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [isUserInfoLoading, userInfo] = useUserInfo();
  const axiosIns = useAxiosIns();
  const [users, setUsers] = useState([]);
  const [usersPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(page - 1 || 0);
  const [pageCount, setPageCount] = useState(0);
  const [isAction, setAction] = useState(false);

  const handlePageClick = ({ selected: page }) => {
    const url = queryString.stringify({ page: page + 1 });

    navigate(location.pathname + "?" + url);
    setCurrentPage(page);
  };

  const handleAdmin = (id, name, isAdmin) => {
    axiosIns
      .put(`/admin/${userInfo._id}/users/${id}`, { isAdmin })
      .then((_) => {
        toast.success(
          name + " has been updated as " + (isAdmin ? "Admin" : "User") + "!"
        );

        setAction(!isAction);
      })
      .catch((_) => toast.error("Something went wrong!"));
  };

  useEffect(
    (_) => {
      if (userInfo && userInfo.isAdmin) {
        axiosIns
          .get(`/admin/${userInfo._id}/users?count=true`)
          .then((response) =>
            setPageCount(Math.ceil(response.data.total / usersPerPage))
          );
      }
    },
    [userInfo]
  );

  useEffect(
    (_) => {
      if (userInfo && userInfo.isAdmin) {
        axiosIns
          .get(
            `/admin/${userInfo._id}/users?page=${currentPage}&limit=${usersPerPage}`
          )
          .then((response) => {
            setUsers(response.data);
            setLoading(false);
          });
      }
    },
    [userInfo, currentPage, isAction]
  );

  return !isUserInfoLoading ? (
    userInfo.isAdmin ? (
      !isLoading ? (
        users.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {users.map((user) => (
                <ManageUser
                  key={user._id}
                  handleAdmin={handleAdmin}
                  user={user}
                />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              <ReactPaginate
                containerClassName="join"
                pageLinkClassName="join-item btn btn-sm"
                activeLinkClassName="btn-active"
                disabledLinkClassName="btn-disabled"
                previousLinkClassName="join-item btn btn-sm"
                nextLinkClassName="join-item btn btn-sm"
                breakLinkClassName="join-item btn btn-sm"
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
              />
            </div>
            <Tooltip anchorSelect=".title" />
          </>
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
            <span>There is no user to manage!</span>
          </div>
        )
      ) : null
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
        <span>You have no right access!</span>
      </div>
    )
  ) : null;
};

export default ManageUsers;
