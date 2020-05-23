import React, { Component } from "react";

class Pagination extends Component {
  render() {
    const { onClick, pageNumber, pages } = this.props;
    const array = new Array(pages).fill(0);
    return (
      <nav aria-label="...">
        <ul className="pagination">
          {array.map((item, index) => (
            <li
              key={index}
              onClick={() => onClick(index + 1)}
              className={
                index + 1 === pageNumber ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" href="#">
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
