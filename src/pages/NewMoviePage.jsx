import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewMovieForm from "../components/NewMovieForm";
import { useRef, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;


const NewMoviePage = () => {
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
                navigate("/movies");
            })
            .catch((err) => {
                console.error(err);
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
          setFormData({ ...formData, releaseYear: value });
        }
      };

    return (
        <>
            <main>
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    <span className="arrow">&larr;</span> Indietro
                </button>


                <div className="container d-flex flex-column my-4">
                    <h1>Aggiungi un nuovo film</h1>
                    <div className="container my-3">
                        <NewMovieForm
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            formData={formData}
                            preview={preview}
                            handleRemoveImage={handleRemoveImage}
                            fileInputRef={fileInputRef}
                            handleYearChange={handleYearChange}
                        />
                    </div>
                </div>


                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    <span className="arrow">&larr;</span> Indietro
                </button>
            </main>
        </>
    )
}

export default NewMoviePage;