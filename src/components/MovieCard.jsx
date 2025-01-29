import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function MovieCard({ movie , handleDeleteMovie}) {
    return (
        <>
            <div className="card h-100">
                <img src={movie.image ? `${apiUrl}/movies_cover/${movie.image}` : "https://placehold.co/200x300.png?text=movie_cover200x300"} />
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
                    <div className="card-title">
                        <h3>{movie.title}</h3>
                    </div>
                    <div className="card-text">
                        {movie.abstract}
                    </div>
                </div>
                <div className="d-flex justify-content-evenly">
                <Link to={`${movie.slug}`} className="btn btn-info text-white">Info</Link>
                <Link to={`${movie.slug}/modify`} className="btn btn-warning text-white">Modifica</Link>
                </div>
                <div className="mt-3">
                    <button className="btn btn-danger  w-100" onClick={() => handleDeleteMovie(movie.id)}>Elimina</button>
                </div>
                
            </div>
        </>
    )
}
export default MovieCard;