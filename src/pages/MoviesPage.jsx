import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        axios.get("http://localhost:3000/movies", {
            params: {
                search: search,
            },
        }).then((resp) => {
            setMovies(resp.data.data);
        });
    };

    const handleEnterKey = (event) => (event.key === "Enter") && getMovies();


    return (
        <>
            <main>
                <h1 className="py-2">Film</h1>
                <div className="d-flex gap-2 mb-3">
                    <input className="form-control" type="search" placeholder="Cerca un film.." value={search} name="search" onKeyUp={(event) => handleEnterKey(event)} onChange={(event) => {setSearch(event.target.value); console.log("event: ",event.target.value); }} />
                    <button className="btn btn-primary" onClick={() => getMovies()}>Cerca</button>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    {movies.map((movie) => (
                        <div className="col my-3" key={movie.id}>
                            <MovieCard
                                movie={movie}
                            />
                        </div>
                    ))}
                </div>

            </main>
        </>
    )
}

export default MoviesPage;