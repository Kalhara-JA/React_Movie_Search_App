import {useEffect, useState} from "react";

import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com/?apikey=7c787060';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm,setSearchTerm]= useState('');

    useEffect(() => {
        searchMovies('Superman')
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&S=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    return (<div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input type="text"
                       placeholder={"Search for Movies"}
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt="Search"
                     onClick={() => searchMovies(searchTerm)}/>
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (<MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>Movies Not Found</h2>
                </div>
            )}
        </div>);
}

export default App;