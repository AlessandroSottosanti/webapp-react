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

    return (
        <>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
                <span className="arrow">&larr;</span> Torna indietro
            </button>

            {movie && (
                <>


                    <section className="d-flex flex-column align-items-center my-5">
                        <div className="container d-flex justify-content-center my-3 img-container">
                            <img src={`${apiUrl}/movies_cover/${movie.image}`} alt={movie.title} />
                        </div>
                        <div className="text d-flex flex-column gap-3">
                            <h1>{movie.title}</h1>
                            <p>{movie.abstract}</p>
                        </div>
                    </section>

                    <section>

                    </section>
                </>
            )}
        </>
    )
}

export default SingleMoviePage;