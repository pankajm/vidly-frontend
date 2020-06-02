import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBar from "./common/searchBar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    activeFilter: { _id: null, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
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
    const searchText = ""; // Clear search if filter is clicked
    this.setState({ currentPage: 1, activeFilter, searchText });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleAddMovie = () => {
    this.props.history.push("/movies/new");
  };

  handleSearch = (searchText) => {
    this.setState({
      searchText,
      activeFilter: { _id: null, name: "All Genres" }, // apply all generes filter while searching,
      currentPage: 1,
      // in other words clear other filters
    });
  };

  getSearchedMovies = () => {
    const { movies, searchText } = this.state;
    const regex = new RegExp(searchText, "i");
    return movies.filter((m) => m.title.match(regex));
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      activeFilter,
      sortColumn,
      searchText,
    } = this.state;

    let filteredMovies = activeFilter._id
      ? allMovies.filter((m) => m.genre._id === activeFilter._id)
      : allMovies;

    if (searchText) filteredMovies = this.getSearchedMovies();

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
          <button
            onClick={this.handleAddMovie}
            className="btn btn-primary mb-2"
          >
            New Movie
          </button>
          <p style={{ fontSize: "20px" }}>
            Showing {count} movies in the database.
          </p>
          <SearchBar
            onSearch={this.handleSearch}
            value={this.state.searchText}
          ></SearchBar>
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
