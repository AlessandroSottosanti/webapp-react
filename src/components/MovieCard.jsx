function MovieCard({movie}) {
    console.log(movie);
return (
    <>
    <div className="card h-100">
        <img src={`http://localhost:3000/movies_cover/${movie.image}`}/>
        <div className="card-body d-flex justify-content-center">
            <div className="card-title">
                <h3>{movie.title}</h3>
            </div>
        </div>
        <div className="card-text m-3">
            {movie.abstract}
        </div>
        <a href="" className="btn btn-primary">Dettagli</a>
    </div>
    </>
)
}
export default MovieCard;