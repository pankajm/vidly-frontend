import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/auth";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={"/movies/" + movie._id}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rental" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} like={movie.like} />
      ),
    },
    {
      key: "delete",
      content: (movie) =>
        auth.getCurrentUser() &&
        auth.getCurrentUser().isAdmin && (
          <button
            onClick={() => {
              this.props.onDelete(movie);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
