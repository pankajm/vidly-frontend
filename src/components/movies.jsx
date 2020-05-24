import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/like";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

  handleDelete = (movie) => {
    let { currentPage, pageSize } = this.state;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    if (currentPage > Math.ceil(movies.length / pageSize))
      currentPage = currentPage - 1;
    this.setState({ movies, currentPage });
  };

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePagination = (currentPage) => {
    this.setState({ currentPage });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    if (!count)
      return (
        <p style={{ fontSize: "20px" }}>There are no movies in the database.</p>
      );
    return (
      <React.Fragment>
        <p style={{ fontSize: "20px" }}>
          Showing {count} movies in the database.
        </p>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleLikeClick(movie)}
                    like={movie.like}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(movie);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          onPageChange={this.handlePagination}
          currentPage={currentPage}
          itemsCount={count}
          pageSize={pageSize}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
