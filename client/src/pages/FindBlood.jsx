import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Donor from "../components/Donor.jsx";

const FindBlood = () => {
  const location = useLocation();
  let { page } = queryString.parse(location.search);
  const navigate = useNavigate();
  const { total } = useLoaderData();
  const [isLoading, setLoading] = useState(true);
  const [donors, setDonors] = useState([]);
  const [donorsPerPage] = useState(10);
  const [pageCount] = useState(Math.ceil(total / donorsPerPage));
  const [currentPage, setCurrentPage] = useState(page - 1 || 0);

  const handlePageClick = (event) => {
    let newPage = (event.selected * donorsPerPage) % total;
    const url = queryString.stringify({ page: newPage + 1 });

    navigate(location.pathname + "?" + url);
    setCurrentPage(newPage);
  };

  useEffect(
    (_) => {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/users/donors?page=${currentPage}&limit=${donorsPerPage}`
        )
        .then((response) => {
          setDonors(response.data);
          setLoading(false);
        });
    },
    [currentPage]
  );

  return (
    <section className="pt-28 pb-10">
      <div className="container">
        {!isLoading ? (
          donors.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {donors.map((donor) => (
                  <Donor key={donor._id} donor={donor} />
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
                  pageRangeDisplayed="2"
                  marginPagesDisplayed="2"
                  onPageChange={handlePageClick}
                  renderOnZeroPageCount={null}
                />
              </div>
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
              <span>There is no donor!</span>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
};

export default FindBlood;
