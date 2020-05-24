import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/like";
import Pagination from "../common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    pageNumber: 1,
    moviesList: getMovies(),
  };

  componentDidMount = () => {
    this.handlePagination(1);
  };

  getTotalPageCount = (moviesList = this.state.moviesList) => {
    const { length } = moviesList;
    return length % 4 === 0 ? length / 4 : Math.floor(length / 4) + 1;
  };

  handleDelete = (movie) => {
    const moviesList = [...this.state.moviesList];
    let index = moviesList.indexOf(moviesList.find((m) => m._id === movie._id));
    moviesList.splice(index, 1);
    this.handlePagination(this.state.pageNumber, moviesList);
  };

  handleLikeClick = (movie) => {
    const moviesList = [...this.state.moviesList];
    let index = moviesList.indexOf(movie);
    moviesList[index] = { ...moviesList[index] };
    moviesList[index].like = !moviesList[index].like;

    const movies = [...this.state.movies];
    index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies, moviesList });
  };

  handlePagination = (
    pageNumber = this.state.pageNumber,
    moviesList = this.state.moviesList
  ) => {
    if (moviesList.length && pageNumber > this.getTotalPageCount(moviesList))
      pageNumber--; // for case when single row is present in page other than page 1
    const movies = [];
    const offset = (pageNumber - 1) * 4 + 1;
    for (
      let index = offset - 1;
      index < offset + 3 && index < moviesList.length;
      index++
    )
      movies.push(moviesList[index]);
    this.setState({ movies, pageNumber, moviesList });
  };

  render() {
    const { length: count } = this.state.movies;
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
            {this.state.movies.map((movie) => (
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
          onClick={this.handlePagination}
          pageNumber={this.state.pageNumber}
          pages={this.getTotalPageCount()}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
