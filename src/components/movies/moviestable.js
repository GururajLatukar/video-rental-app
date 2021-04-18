import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

class moviestable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { Movies, onDeleteMovie } = this.props;
    const currentUser = getCurrentUser();
    return (
      <table className="table">
        <thead>
          <tr style={{cursor: 'pointer'}}>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Movies.map((movie) => (
            <tr key={movie._id}>
              <td><Link to={`/movies/${movie._id}`}>{movie.title}</Link></td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                {currentUser && currentUser.isAdmin && <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteMovie(movie._id)}
                >
                  Delete
                </button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default moviestable;
