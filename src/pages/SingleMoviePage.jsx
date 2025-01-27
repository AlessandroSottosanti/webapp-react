import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function SingleMoviePage() {
    const { slug } = useParams();

    const [movie, setMovie] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${apiUrl}/movies/${slug}`).then((resp) => {
            setMovie(resp.data.data);
        })
    }, []);

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(i);
    }

    console.log(stars);

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
                                <div >
                                    {stars.map((star) => {
                                        const voteAvg = Math.ceil(movie.vote_avg);
                                        if (star <= voteAvg) {
                                            return (<i className="fa-solid fa-star"></i>)
                                        }
                                        return (<i className="fa-regular fa-star"></i>)
                                    })}
                                </div>
                            </span>
                        </div>
                    </section>

                    <section className="d-flex flex-column container">
                        <h2>Recensioni</h2>
                        { movie.reviews && movie.reviews.map((review) => { 
                            <ReviewCard
                            reviews={review}
                            key={review.id}
                        />
                        })}
                        
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