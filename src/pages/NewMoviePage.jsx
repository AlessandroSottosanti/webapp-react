import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewMovieForm from "../components/NewMovieForm";
import { useState } from "react";
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
    
      const handleChange = (e) => {
        const { name, value, type } = e.target;

        if( type === "file" ) {
            setFormData({ ...formData, image: e.target.files[0] });
        }

        else {
            setFormData({ ...formData, [name]: value });
        }
        
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Invia form:", formData);

        const dataToSend = new FormData();

        for(let key in formData) {
            dataToSend.append(key, formData[key]);
        }

        axios.post(`${apiUrl}/movies`, dataToSend, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
        .then((resp) => {
            console.log(resp);
        });
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