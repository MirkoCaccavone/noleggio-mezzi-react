import { useLocation } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import '../style/SearchResults.css'

export default function SearchResults() {
    const location = useLocation();
    const results = location.state?.results || [];

    return (
        <div className="search-results">
            <h2 className="title-search-results">Risultati della ricerca</h2>
            {results.length === 0 ? (
                <p>Nessun veicolo trovato.</p>
            ) : (
                <div className="search-results-container">
                    {results.map(vehicle => (
                        <VehicleCard
                            key={vehicle.id}
                            vehicle={vehicle}
                        />
                    ))}
                </div>

            )}
        </div>
    );
}