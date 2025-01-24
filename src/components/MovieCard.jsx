function MovieCard({ movie }) {
    return (
        <>
            <div className="card h-100">
                <img src={movie.image ? `http://localhost:3000/movies_cover/${movie.image}` : "https://placehold.co/200x300.png?text=movie"} />
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-2">
                    <div className="card-title">
                        <h3>{movie.title}</h3>
                    </div>
                    <div className="card-text">
                        {movie.abstract}
                    </div>
                </div>
                <a href="" className="btn btn-primary">Dettagli</a>
            </div>
        </>
    )
}
export default MovieCard;