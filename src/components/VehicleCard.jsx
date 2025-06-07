import { Link } from "react-router-dom"

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="vehicle-card">
            <span className={`availability-badge ${vehicle.available === 1 ? 'available' : ''}`}>
                {vehicle.available === 1 ? 'Disponibile' : 'Non disponibile'}
            </span>
            <img
                src={`http://127.0.0.1:8000/storage/${vehicle.image}`}
                alt='Immagine non disponibile'
                className="vehicle-img"
            />
            <div className="vehicle-info">
                <h2>{vehicle.brand} {vehicle.model}</h2>
                <p><strong>Tipo:</strong> {vehicle.type}</p>
                <p>{vehicle.type !== 'Bike' ? (<><strong>Targa:</strong> {vehicle.plate}</>) : null}</p>
                <p>{vehicle.description}</p>
                <div className="vehicle-price">€{vehicle.price_per_day} / giorno</div>
                <Link to={`/vehicles/${vehicle.id}`}>Vai al dettaglio</Link>
            </div>
        </div>
    )
}

export default VehicleCard