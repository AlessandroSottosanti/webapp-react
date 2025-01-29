import { useContext, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { MoviesContext } from "../contexts/MoviesContext";

function MoviesPage() {
   
    const {getMovies, getGenres, getReleaseYear, handleGenreChange, handleReleaseYearChange, resetFilters, handleEnterKey, movies, search, setSearch, genre, releaseYear, allReleaseYears, allGenres, handleDeleteMovie} = useContext(MoviesContext);

    useEffect(() => {
        getMovies();
        getGenres();
        getReleaseYear();
    }, [genre, releaseYear]);

   

    return (
        <>
            <main>
                <h1 className="py-2">Film</h1>
                <div className="d-flex gap-2 mb-3">
                    <input className="form-control" type="search" placeholder="Cerca un film.." value={search} name="search" onKeyUp={(event) => handleEnterKey(event)} onChange={(event) => { setSearch(event.target.value); console.log("event: ", event.target.value); }} />
                    <button className="btn btn-primary" onClick={() => getMovies()}>Cerca</button>
                </div>
                <div className="filters d-flex gap-2 mb-3">

                    <select className="form-select w-auto" aria-label="Default select example" value={genre} onChange={handleGenreChange}>
                        <option value={'all'}>Filtra per genere (tutti)</option>

                        {allGenres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>

                    <select className="form-select w-auto" aria-label="Default select example" value={releaseYear} onChange={handleReleaseYearChange}>
                        <option value={'all'}>filtra per anno (tutti)</option>

                        {allReleaseYears.map((releaseYear, index) => (
                            <option key={index} value={releaseYear}>{releaseYear}</option>
                        ))}
                    </select>

                    <button className="btn btn-secondary" onClick={resetFilters}>Resetta Filtri</button>

                </div>

                <Link to={`/new-movie`} className="btn btn-primary mt-3">+ Aggiungi Film</Link>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 my-5">
                    {movies.length !== 0 ? movies.map((movie) => (
                        <div className="col my-4" key={movie.slug}>
                            <MovieCard
                                movie={movie}
                                handleDeleteMovie={handleDeleteMovie}
                            />
                        </div>
                    ))
                        :
                        <>
                            <div className="container">
                                <div className="card p-5">
                                    nessun film trovato
                                </div>
                            </div>
                        </>
                    }
                </div>

            </main>
        </>
    )
}

export default MoviesPage;