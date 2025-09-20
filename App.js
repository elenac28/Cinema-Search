import { useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=2f79e7d4";

const movie1 = {
    "Title": "The Grand Budapest Hotel",
    "Year": "2014",
    "imdbID": "tt2278388",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);

    }
    useEffect(() => {
        searchMovies('The Grand Budapest Hotel');
    }, []);

    return (
        <div className={"app"}>
            <h1>Cinema Search</h1>

            <div className={"search"}>
                <input placeholder={"Search for movies"}
                       value={searchTerm}
                       onChange={(e)=> setSearchTerm(e.target.value)}/>
                <img src={SearchIcon}
                     alt={"search"}
                     onClick={() => searchMovies(searchTerm)}></img>
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className={"container"}>
                            {movies.filter((movie, index, self) =>
                                index === self.findIndex((m) => m.imdbID === movie.imdbID)
                            ).map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie}/>
                            ))}
                        </div>
                    ) : (
                        <div className={"empty"}>
                            <h2>No movies found</h2>
                        </div>
                    )
            }
            <div className={"container"}>
                <MovieCard movie={movies[0]}/>
            </div>
        </div>
    );
}
export default App;
