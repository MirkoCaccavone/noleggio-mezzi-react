import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(` http://127.0.0.1:8000/api/vehicles/search?q=${query}`)
            .then(res => {
                console.log('Risultati della ricerca', res.data);
                navigate('/search', { state: { results: res.data } });
                setQuery('');
            })
            .catch(err => {
                console.error('Errore durante la ricerca', err);
                setQuery('');
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Cerca i tuoi prodotti..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Cerca</button>
        </form>
    );
}
