import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function MoviesPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/movies").then((resp) => {
            setMovies(resp.data.data);
        });
    }
, []);
    return (
        <>
        <section>
        <h1>Ritorna una lista di film</h1>

        </section>

        <section>
            <h2>Elenco Film</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {movies.map((movie) => (
                <div className="col my-2" key={movie.id}>
                    <MovieCard 
                movie={movie}
                />
                </div>
                
            ))}
            </div>
           
        </section>
        </>
    )
}

export default MoviesPage;