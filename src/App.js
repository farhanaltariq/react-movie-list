import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";
import moment from "moment";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovieList().then((result) => {
            setMovies(result);
        });
    }, []);

    const PopularMovieList = () => {
        return movies.map((movie, i) => {
            return (
                <div className="Movie-wrapper" key={i}>
                    <div className="Movie-title">{movie.title}</div>
                    <img
                        className="Movie-image"
                        src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                        alt={movie.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/notfound.jpg";
                        }}
                    ></img>
                    <table className="Table">
                        <tbody>
                            <tr className="Row">
                                <td className="Desc">Release Date</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td className="Movie-date">
                                    {moment(movie.release_date).format(
                                        "DD MMMM YYYY"
                                    )}
                                </td>
                            </tr>
                            <tr className="Row">
                                <td className="Desc">Rating</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td className="Movie-rate">
                                    {movie.vote_average}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        });
    };

    const search = async (q) => {
        let res;
        if (q === "") res = await getMovieList();
        else res = await searchMovie(q);
        setMovies(res);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>- - - Movie Databases - - -</h1>
                <input
                    className="Movie-search"
                    type="text"
                    placeholder="Find a Movie"
                    onChange={({ target }) => search(target.value)}
                />
                <div className="Movie-container">
                    <PopularMovieList />
                </div>
            </header>
        </div>
    );
}

export default App;
