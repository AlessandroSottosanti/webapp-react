import { useNavigate } from "react-router-dom";
import NewMovieForm from "../components/NewMovieForm";
import { useContext } from "react";
import { NewMovieContext } from "../contexts/NewMovieContext";


const NewMoviePage = () => {
    const navigate = useNavigate();

    
    const {handleChange, handleSubmit, handleRemoveImage, handleYearChange, formData, preview, fileInputRef} = useContext(NewMovieContext);


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