import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import _ from "lodash";

class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).required().label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const { history, match } = this.props;
    const genres = getGenres();
    if (match.params._id !== "new") {
      let movie = getMovie(match.params._id);
      if (!movie) return history.replace("/not-found");
      this.setState({ data: this.mapDataToView(movie), genres });
    } else this.setState({ genres });
  }

  mapDataToView(data) {
    const movie = _.pick(data, [
      "_id",
      "title",
      "numberInStock",
      "dailyRentalRate",
    ]);
    movie.genreId = data.genre._id;
    return movie;
  }

  doSubmit = () => {
    // save movie in database
    const movie = { ...this.state.data };
    saveMovie(movie);
    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit} className="mt-3">
          {this.renderInput("title", "Title")}
          {this.renderSelectInput("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MoviesForm;
