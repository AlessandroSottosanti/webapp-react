
const NewMovieForm = ({ handleChange, handleSubmit, formData }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 bg-dark card-no-hover">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="director" className="form-label">Director</label>
                    <input type="text" name="director" className="form-control" value={formData.director} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="releaseYear" className="form-label">Release Year</label>
                    <input type="number" name="releaseYear" className="form-control" value={formData.releaseYear} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" name="genre" className="form-control" value={formData.genre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" name="image" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="abstract" className="form-label">Abstract</label>
                    <textarea name="abstract" className="form-control" value={formData.abstract} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default NewMovieForm;