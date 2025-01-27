function ReviewCard({review}) {
    console.log("review:", review);
    return (
        <div className="card">
            <div className="card-content">
                <h1>{review.name}</h1>
            </div>
        </div>
    )
} 
export default ReviewCard;