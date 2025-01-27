import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
const apiUrl = import.meta.env.VITE_API_URL;

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');
    const [releaseYear, setReleaseYear] = useState('all');

    const [releaseYears, setReleaseYears] = useState([]);

    const [allGenres, setAllGenres] = useState([]);
    const [genres, setGenres] = useState([allGenres]);
    const [allReleaseYears, setAllReleaseYears] = useState([]);


    useEffect(() => {
        getMovies();
        getGenres();
        getReleaseYear();
    }, [genre, releaseYear]);

    const getMovies = () => {
        // Per gestire nuovi filtri sui film sarà necessario inserirli qui, dato che il BE li gestirà dinamicamente sfruttando le Key
        axios.get(`${apiUrl}/movies`, {
            params: {
                ...(search && { search }), 
                ...(genre !== 'all' && { genre }),
                ...(releaseYear !== 'all' && { release_year: releaseYear })
            },
        }).then((resp) => {
            const fetchedMovies = resp.data.data;
            setMovies(fetchedMovies);             
        }).catch((err) => {
            console.log("Errore nel caricamento dei film", err);
        });
    };

    const getGenres = () => {
        axios.get(`${apiUrl}/genres`)
        .then((resp) => {
            const fetchedGenres = resp.data.data.map(item => item.genre);
            setAllGenres(fetchedGenres);             
        }).catch((err) => {
            console.log("Errore nel caricamento dei generi", err);
        });
    }

    const getReleaseYear = () => {
        axios.get(`${apiUrl}/release-years`)
        .then((resp) => {
            const fetchedyears = resp.data.data.map(item => item.release_year);
            setAllReleaseYears(fetchedyears);             
        }).catch((err) => {
            console.log("Errore nel caricamento dei generi", err);
        });
    }

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

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 my-5">
                    {movies.length !== 0 ? movies.map((movie) => (
                        <div className="col my-4" key={movie.slug}>
                            <MovieCard
                                movie={movie}
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