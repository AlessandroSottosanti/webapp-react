
function ReviewForm({ formData, handleSubmit, handleChange, showAlert, setShowAlert }) {

    return (
        <form className="p-4 card-non-hover" onSubmit={handleSubmit}>
            <h2 className="mb-4">Aggiungi una Recensione</h2>

            {/* Campo Name */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Nome
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Inserisci il tuo nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo Vote */}
            <div className="mb-3">
                <label htmlFor="vote" className="form-label">
                    Voto
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="vote"
                    name="vote"
                    placeholder="Inserisci un voto (0-5)"
                    value={formData.vote}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required
                />
            </div>

            {/* Campo Text */}
            <div className="mb-3">
                <label htmlFor="text" className="form-label">
                    Testo
                </label>
                <textarea
                    className="form-control"
                    id="text"
                    name="text"
                    placeholder="Scrivi la tua recensione"
                    value={formData.text}
                    onChange={handleChange}
                    rows="4"
                ></textarea>
            </div>

            {/* Alert per dati non validi */}
            {showAlert && (
                <div className="alert alert-danger d-flex flex-column align-items-center p-3 position-relative">
                    <span className="close-btn btn btn-danger" onClick={() => setShowAlert(false)}>X</span>
                    <strong className="mb-1">Errore nell'inserimento dei campi.</strong>
                    <span>Assicurati che:
                        <ul>
                            <li> il campo Nome abbia almeno 3 lettere</li>
                            <li> il voto sia compreso tra 0 e 5</li>
                            <li>il testo (se presente) sia maggiore di 5 lettere</li>
                        </ul>
                    </span>
                </div>
            )}

            {/* Bottone Submit */}
            <button type="submit" className="btn btn-primary w-100">
                Invia Recensione
            </button>
        </form>
    );
}

export default ReviewForm;
