import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, createMovie, updateMovie } from "../services/movieService";
import _ from "lodash";
import { toast } from "react-toastify";

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

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const { history, match } = this.props;
    if (match.params._id !== "new") {
      try {
        let { data: movie } = await getMovie(match.params._id);
        this.setState({ data: this.mapDataToView(movie) });
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          return history.replace("/not-found");
        }
      }
    }
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

  doSubmit = async () => {
    // save movie in database
    try {
      const movie = { ...this.state.data };
      if (!movie._id) await createMovie(movie);
      else {
        const updatedMovie = _.pick(movie, [
          "title",
          "genreId",
          "numberInStock",
          "dailyRentalRate",
        ]);
        try {
          await updateMovie(movie._id, updatedMovie);
        } catch (ex) {
          if (ex.response && ex.response.status === 404) {
            toast("Movie not found. Might have been deleted already.");
          }
        }
      }
      this.props.history.push("/movies");
    } catch (ex) {
      if (ex.response && [400, 401].includes(ex.response.status))
        toast("Action not permited");
    }
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
