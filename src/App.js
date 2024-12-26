import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './Search.svg';
import MovieCard from './MovieCard';
import {SnowOverlay} from 'react-snow-overlay';

// OMDB API key: 9559626c


const API_URL = "https://www.omdbapi.com?apikey=9559626c"



const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        //async function, takes time to fetch movies
        const response = await fetch(`${API_URL}&s=${title}`);
        // API call ^
        const data = await response.json();
        setMovies(data.Search);
        
    }
    useEffect(() => {
        searchMovies('movie');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon}
                alt='Search'
                onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                (movies.length > 0) 
                ?(
                //render the movie card
                <div className="container">
                    
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
                )
                : //else, no movies
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )

            }

        </div>
    );
}

export default App; //we gotta export components so we can use them elsewhere