import { useContext, useEffect } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import { useParams } from "react-router-dom";
import NewMovieForm from "../components/NewMovieForm";
import { NewMovieContext } from "../contexts/NewMovieContext";

const EditMoviePage = () => {
    const { getMovieDetails, movie, navigate } = useContext(MoviesContext);
    const { slug } = useParams();
    const { handleChange, handleSubmit, formData, setFormData, preview, handleRemoveImage, fileInputRef, handleYearChange, apiUrl, handleModifyMovie } = useContext(NewMovieContext);
    
    useEffect(() => {
        window.scrollTo(0, 0);  
        getMovieDetails(slug);

        
    }, [slug]);

    useEffect(() => {
        if (movie && Object.keys(movie).length > 0) { 
            setFormData(movie);
        }
    }, [movie]);


    return (
        <>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-5">
                    <span className="arrow">&larr;</span> Indietro
                </button>
            {movie && (
                <main>
                    <h1>{movie.title}</h1>
                    <NewMovieForm
                        handleChange={handleChange}
                        handleSubmit={handleModifyMovie}
                        formData={formData}
                        preview={preview}
                        handleRemoveImage={handleRemoveImage}
                        fileInputRef={fileInputRef}
                        handleYearChange={handleYearChange}

                    />
                </main>
            )}
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    <span className="arrow">&larr;</span> Indietro
                </button>
        </>
    )
}

export default EditMoviePage;