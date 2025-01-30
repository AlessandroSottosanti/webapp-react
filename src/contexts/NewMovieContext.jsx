import { createContext, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


const NewMovieContext = createContext();

const NewMovieProvider = ({ children }) => {
    const navigate = useNavigate();

    const initialData = {
        title: "",
        director: "",
        releaseYear: "",
        genre: "",
        image: null,
        abstract: "",
    }

    const [formData, setFormData] = useState(initialData);
    const [preview, setPreview] = useState(null);
    // per rimuovere il nome del file dall'input una volta rimosso
    const fileInputRef = useRef(null); // Ref per l'input file

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const file = e.target.files[0];
            if (preview) {
                URL.revokeObjectURL(preview);
            }

            setFormData({ ...formData, image: file });

            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }

        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Invia form:", formData);

        const dataToSend = new FormData();

        for (let key in formData) {
            dataToSend.append(key, formData[key]);
        }

        axios.post(`${apiUrl}/movies`, dataToSend, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
            .then((resp) => {
                console.log(resp);
                setFormData(initialData);
                alert("Film salvato con successo!");
                navigate("/movies");
            })
            .catch((err) => {
                console.error(err);
                alert("Errore durante il salvataggio del film.");
            })
    };

    const handleRemoveImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setFormData({ ...formData, image: initialData.image });
        setPreview(null);

        // Resetta l'input file
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleYearChange = (e) => {
        const value = e.target.value;

        // Permetti solo numeri e massimo 4 cifre
        if (/^\d{0,4}$/.test(value)) {
            setFormData({ ...formData, release_year: value });
        }
    };

    const handleModifyMovie = (event) => {
        event.preventDefault();
    
        // Creiamo una copia di formData per evitare modifiche dirette
        const updatedMovie = { ...formData };
    
        if (updatedMovie.image instanceof File) {
            updatedMovie.image = updatedMovie.image.name;
        }
    
        axios.put(`${apiUrl}/movies/${updatedMovie.id}`, updatedMovie, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
        .then((resp) => {
            console.log("Film modificato con successo:", resp.data);
            alert("Film modificato con successo!");
            navigate('movies');
        })
        .catch((err) => {
            console.error("Errore nella modifica del film:", err);
            alert("Errore durante la modifica del film.");
        });
    };

    return (
        <NewMovieContext.Provider
            value={{
                handleChange,
                handleSubmit,
                handleRemoveImage,
                handleYearChange,
                formData,
                setFormData,
                preview,
                fileInputRef,
                apiUrl,
                handleModifyMovie,
            }}
        >
            {children}
        </NewMovieContext.Provider>
    );
};

export { NewMovieContext, NewMovieProvider };
