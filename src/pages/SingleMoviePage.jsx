import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

const apiUrl = import.meta.env.VITE_API_URL;

const initilaData = {
    name: "",
    vote: 1,
    text: "",
}

function SingleMoviePage() {
    const { slug } = useParams();

    const [movie, setMovie] = useState(null);

    const [formData, setFormData] = useState(initilaData)
    const [showAlert, setShowAlert] = useState(false); 


    const navigate = useNavigate();

    const getMovieDetails = () => {
        axios.get(`${apiUrl}/movies/${slug}`).then((resp) => {
            setMovie(resp.data.data);
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(i);
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