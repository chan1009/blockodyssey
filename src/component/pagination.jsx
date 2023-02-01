import React, { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, setPost }) => {
  const handleSelect = (e) => {
    setPost(e.target.value);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav className="PaginationWrapper">
        페이지당 행:
        <select onChange={handleSelect} className="PaginationSelect">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <span onClick={() => paginate(number)} className="page-link">
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
