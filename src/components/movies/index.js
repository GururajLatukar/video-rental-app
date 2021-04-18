import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { getCurrentUser } from "../../services/authService";
import Pagination from "./pagination";
import Listgroup from "./listgroup";
import { paginate } from "../../utils/paginate";
import Moviestable from "./moviestable";
import Searchbox from "../common/searchbox";
import Layout from "../layout";
import _ from "lodash";
import { Link } from "react-router-dom";

class Index extends Component {
  state = {
    movies: [],
    genres: [],
    activeGenre: {},
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4,
    currentPage: 1,
    searchQuery: ""
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres, activeGenre: genres[0] });
  }
  deleteMovie = async (movieId) => {
    const orginalMovies = this.state.movies;
    const movies = orginalMovies.filter((movie) => movie._id !== movieId);
    this.setState({ movies });
    try{
      await deleteMovie(movieId);
    }
    catch(ex){
      if(ex.response && ex.response.status === 404)
        toast.error('This movie is already deleted');

      this.setState({ movies: orginalMovies })
    }
  };
  pageChange = (page) => {
    this.setState({ currentPage: page });
  };
  genreChange = (genre) => {
    this.setState({ activeGenre: genre, searchQuery: "", currentPage: 1 });
  };
  sort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  searchMovie = query => {
    this.setState({ searchQuery: query, activeGenre: "All Genres", currentPage: 1})
  }
  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      activeGenre,
      sortColumn,
      searchQuery
    } = this.state;
    if (movies.length === 0)
      return <p className="mt-3">There are no movies in the database.</p>;

    let filteredMovies = movies;
    if(searchQuery){
      filteredMovies = movies.filter((movie) => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    } else if(activeGenre && activeGenre._id){
      filteredMovies = movies.filter((movie) => movie.genre._id === activeGenre._id);
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const altMovies = paginate(sortedMovies, currentPage, pageSize);

    const currentUser = getCurrentUser();

    return (
      <Layout>
        <div className="mt-3">
          <div className="row">
            <div className="col-md-3">
              <Listgroup
                genres={genres}
                activeGenre={activeGenre}
                onGenreChange={this.genreChange}
              />
            </div>
            <div className="col-md-9">
              {currentUser && <Link to="/movies/new" className="btn btn-primary mb-4">New Movie</Link>}
              <p>Showing {altMovies.length} movies in the database.</p>
              <Searchbox value={searchQuery} onChange={this.searchMovie} />
              <Moviestable
                sortColumn={sortColumn}
                Movies={altMovies}
                onDeleteMovie={this.deleteMovie}
                onSort={this.sort}
              />
              <Pagination
                itemCount={sortedMovies.length}
                pageSize={pageSize}
                onPageChange={this.pageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Index;
