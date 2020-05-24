import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "../common/like";
import Pagination from "../common/pagination";
import Filter from "../common/filter";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    activeFilter: { _id: null, name: "All Genres" },
  };

  componentDidMount = () => {
    this.setState({ movies: getMovies(), genres: getGenres() });
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

  handleFilter = (filter) => {
    const activeFilter = { ...filter };
    this.setState({ currentPage: 1, activeFilter });
  };

  render() {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      activeFilter,
      genres,
    } = this.state;

    let filteredMovies = activeFilter._id
      ? allMovies.filter((m) => m.genre._id === activeFilter._id)
      : allMovies;

    const { length: count } = filteredMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    if (!allMovies.length)
      return (
        <p style={{ fontSize: "20px" }}>There are no movies in the database.</p>
      );
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Filter
              onFilterApply={this.handleFilter}
              activeFilter={this.state.activeFilter}
              listItems={[{ _id: null, name: "All Genres" }, ...genres]}
            />
          </div>
          <div className="col">
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
