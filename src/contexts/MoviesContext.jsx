import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const MoviesContext = createContext();

// Film detail vuoto
const initilaData = {
    name: "",
    vote: 1,
    text: "",
}

const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');
    const [releaseYear, setReleaseYear] = useState('all');

    const [releaseYears, setReleaseYears] = useState([]);

    const [allGenres, setAllGenres] = useState([]);
    const [genres, setGenres] = useState([allGenres]);
    const [allReleaseYears, setAllReleaseYears] = useState([]);

    // Get details

    const [movie, setMovie] = useState(null);

    const [formData, setFormData] = useState(initilaData)
    const [showAlert, setShowAlert] = useState(false); 

    const stars = [];
    
        for (let i = 1; i <= 5; i++) {
            stars.push(i);
        }
    
    // /Get details

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
 

    // GET DETAILS FUNCS
    

        const navigate = useNavigate();
    
       

        const getMovieDetails = (slug) => {
            axios.get(`${apiUrl}/movies/${slug}`).then((resp) => {
                setMovie(resp.data.data);
                console.log(resp.data.data);
            })
        }
    
    
        const handleChange = (event) => {
            let { name, value } = event.target;
            
            if(name === "vote"){
                value = parseInt(value);
            }
    
            setFormData({
                ...formData,
                [name]: value,
            });
        };
    
        const handleSubmit = (event) => {
            event.preventDefault(); // Evita il refresh della pagina
    
            if (
                formData.name.length <= 3 ||
                isNaN(formData.vote) ||
                formData.vote < 0 ||
                formData.vote > 5 ||
                (formData.text && formData.text.trim().length > 0 && formData.text.trim().length < 5)
            ) {
                setShowAlert(true); // Mostra l'alert
                return;
            }
            console.log('review:', formData);
    
            axios.post(`${apiUrl}/movies/${movie.id}`, formData)
                .then((resp) => {
                    setFormData(initilaData);
                    getMovieDetails();
                    console.log(resp);
                    setShowAlert(false);
                }) .catch((err) => {
                    console.error("Errore:", err);
                    setShowAlert(true);
    
                });
        };
    
        const handleModifyMovie = () => {
            return console.log("modificato film");

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
            
            // info
            initilaData,
            movie,
            formData,
            showAlert,
            stars,

            setFormData,
            setShowAlert,
            navigate,
            getMovieDetails,
            handleChange,
            handleSubmit,
            handleModifyMovie
        }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesProvider };
