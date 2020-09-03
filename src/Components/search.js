import React, { useState } from 'react'
import Card from './card'

function Search() {

    const [query, setQuery] = useState(''); 

    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        const URL = `https://api.themoviedb.org/3/search/movie?api_key=6d62cf3292d0f6f6ed6a01760eea9bb5&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data);
        setMovies(data.results)
        }catch(err){
            console.log(err);
        }
    }
        return (
            <>
                <form className="form" onSubmit={searchMovies}>
                    <label className="label" htmlFor="query">Movie Search: </label>
                    <input className="input" type="text" name="query"
                    placeholder="Type to search"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    required
                    />
                    <button className="button" type="submit">Search</button>
                </form>
                {movies.length > 0
                    ? <div className="card-list">
                        {movies.filter(movie => movie.poster_path).map(movie => (
                            <Card movie={movie} key={movie.id} />
                        ))}
                    </div>
                    : <div className="no-result">
                        <h3>I looked really hard but couldn't find anything. Sorry.</h3>
                        <span className="no-result--emoji" role="img" aria-label="shy emoji">
                        &nbsp;&nbsp;🥺<br/>
                        👉👈
                        </span>
                    </div>
                }
            </>
        );    
}

export default Search