import { useContext, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { MoviesContext } from "../contexts/MoviesContext";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function SingleMoviePage() {
    
    const { slug } = useParams();

    const {initilaData, movie, formData, setFormData, setShowAlert, showAlert, stars, navigate, getMovieDetails, handleChange, handleSubmit} = useContext(MoviesContext);
  
    useEffect(() => {
        getMovieDetails(slug);
    }, []);

    return (
        <>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                <span className="arrow">&larr;</span> Indietro
            </button>

            {movie && (
                <>


                    <section className="d-flex flex-column my-5 container">
                        <div className="container d-flex justify-content-center my-3 img-container">
                            <img src={movie.image ? `${apiUrl}/movies_cover/${movie.image}` : "https://placehold.co/200x300.png?text=movie_cover200x300"} alt={movie.title} />
                        </div>
                        <div className="text d-flex flex-column gap-3 my-3">
                            <h1>{movie.title}</h1>
                            <p>{movie.abstract}</p>
                            <span className="d-flex flex-row gap-3 rating">Voto:
                                <div>
                                    {stars.map((star, index) => {
                                        const voteAvg = Math.ceil(movie.vote_avg);
                                        if (star <= voteAvg) {
                                            return (<i key={index} className="fa-solid fa-star"></i>)
                                        }
                                        return (<i key={index} className="fa-regular fa-star"></i>)
                                    })}
                                </div>
                            </span>
                        </div>
                    </section>

                    <section>
                        <ReviewForm

                            formData={formData}
                            setFormData={setFormData}
                            initilaData={initilaData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                        />
                    </section>

                    <section className="d-flex flex-column container mt-4">
                        <h2>Recensioni</h2>
                        <div className="d-flex flex-column gap-4 my-4">
                            {movie.reviews && movie.reviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                />
                            ))}
                        </div>


                    </section>
                </>
            )}

            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                <span className="arrow">&larr;</span> Indietro
            </button>
        </>
    )
}

export default SingleMoviePage;