import { createContext, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');
    const [releaseYear, setReleaseYear] = useState('all');

    const [releaseYears, setReleaseYears] = useState([]);

    const [allGenres, setAllGenres] = useState([]);
    const [genres, setGenres] = useState([allGenres]);
    const [allReleaseYears, setAllReleaseYears] = useState([]);

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

    const handleDeleteMovie = (movie_id) => {
        axios.delete(`${apiUrl}/movies/${movie_id}`)
        .then((resp) => {
            console.log(resp);
            getMovies();
        })
        .catch((err) => {
            console.error(err);
        }
        )

    }
 
  return (
    <MoviesContext.Provider
        value={{
            getMovies,
            getGenres,
            getReleaseYear,
            handleGenreChange,
            handleReleaseYearChange,
            resetFilters,
            handleEnterKey,
            handleDeleteMovie,
            movies,
            search,
            setSearch,
            genre,
            releaseYear,
            allReleaseYears,
            allGenres,
            genres,
            
        }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesProvider };
