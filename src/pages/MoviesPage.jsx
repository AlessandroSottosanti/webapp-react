import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function MoviesPage() {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');
    const [releaseYear, setReleaseYear] = useState('all');

    const [genres, setGenres] = useState([]);
    const [releaseYears, setReleaseYears] = useState([]);

    const [allGenres, setAllGenres] = useState([]);
    const [allReleaseYears, setAllReleaseYears] = useState([]);

    const getGenresAndYears = (movies) => {
        const allGenres = [...new Set(movies.map(movie => movie.genre))];
        const allReleaseYears = [...new Set(movies.map(movie => movie.release_year))];
        setAllGenres(allGenres);
        setAllReleaseYears(allReleaseYears);
        setGenres(allGenres);
        setReleaseYears(allReleaseYears);
    };

    useEffect(() => {
        getMovies();

    }, [genre, releaseYear]);

    const getMovies = () => {
        axios.get("http://localhost:3000/movies", {
            params: {
                search: search,
                genre: genre === 'all' ? '' : genre, 
                age: releaseYear === 'all' ? '' : releaseYear 
            },
        }).then((resp) => {
            setMovies(resp.data.data);
        }).catch((err) => {
            console.log("Errore nel caricamento dei film", err);
        });
    };
    

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleReleaseYearChange = (event) => {
        setReleaseYear(event.target.value);
    };

    const resetFilters = () => {
        setSearch('');
        setGenre('all');
        setReleaseYear('all');
        getMovies(); // Ricarica i film senza filtri
    };

    const handleEnterKey = (event) => (event.key === "Enter") && getMovies();


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

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    {movies.length !== 0 ? movies.map((movie) => (
                        <div className="col my-3" key={movie.id}>
                            <MovieCard
                                movie={movie}
                            />
                        </div>
                    ))
                :
                <div className="container my-2">
                    <div className="card p-5">Nessun film trovato.</div>
                </div>
                }
                </div>

            </main>
        </>
    )
}

export default MoviesPage;