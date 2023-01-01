import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";
function App() {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        getMovieList().then((result) => {
            setPopularMovies(result);
        });
    }, []);

    const PopularMovieList = () => {
        return popularMovies.map((movie, i) => {
            return (
                <div className="Movie-wrapper" key={i}>
                    <div className="Movie-title">{movie.title}</div>
                    <img
                        className="Movie-image"
                        src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                        alt="?"
                    ></img>
                    <div className="Movie-date">{movie.release_date}</div>
                    <div className="Movie-rate">{movie.vote_average}</div>
                </div>
            );
        });
    };

    const search = async (q) => {
        if (q.length > 3) {
            const res = await searchMovie(q);
            setPopularMovies(res.results);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello World</h1>
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
