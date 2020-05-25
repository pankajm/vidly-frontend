import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

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
            <span className="page-link">{item}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
