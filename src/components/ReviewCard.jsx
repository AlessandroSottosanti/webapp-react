function ReviewCard({ review }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(i);
    }

    return (
        <div className="card container p-3 my-3">
            <div className="card-content d-flex flex-column gap-3">
                <h2>{review.name}</h2>
                <span className="rating">{stars.map((star, index) => {
                    const voteAvg = Math.ceil(review.vote);
                    if (star <= voteAvg) {
                        return (<i key={index} className="fa-solid fa-star"></i>)
                    }
                    return (<i key={index} className="fa-regular fa-star"></i>)
                })}
                </span>
                <p>{review.text}</p>
            </div>
        </div>
    )
}
export default ReviewCard;