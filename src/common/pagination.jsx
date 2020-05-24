import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { onPageChange, pageSize, itemsCount, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map((item) => (
          <li
            key={item}
            onClick={() => onPageChange(item)}
            className={item === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
