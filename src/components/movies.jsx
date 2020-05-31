import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    activeFilter: { _id: null, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
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
    deleteMovie(movie._id);
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      activeFilter,
      sortColumn,
    } = this.state;

    let filteredMovies = activeFilter._id
      ? allMovies.filter((m) => m.genre._id === activeFilter._id)
      : allMovies;

    const { length: count } = filteredMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { movies, count };
  };

  render() {
    const { currentPage, pageSize, movies: allMovies, genres } = this.state;

    const { movies, count } = this.getPagedData();

    if (!allMovies.length)
      return (
        <p style={{ fontSize: "20px" }}>There are no movies in the database.</p>
      );
    return (
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
          <MoviesTable
            movies={movies}
            onLike={this.handleLikeClick}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            onPageChange={this.handlePagination}
            currentPage={currentPage}
            itemsCount={count}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
