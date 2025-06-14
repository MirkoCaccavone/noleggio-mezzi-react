import axios from "axios";

import { useState, useEffect } from "react"

import { Link, useParams, useNavigate } from "react-router-dom";
import '../style/DetailPage.css'
import BookingForm from "../components/BookingForm";

const DetailPage = () => {

    // recuperiamo l'id del film richiesto
    const { id } = useParams();

    // utilizzo il reedirect
    // const redirect = useNavigate();

    // settiamo lo stato del componente
    const [vehicle, setVehicle] = useState([]);

    // funzione di chiamata all API per il film richiesto
    const fetchVehicle = () => {
        axios.get(`http://127.0.0.1:8000/api/vehicles/${id}`)
            .then(res => {
                console.log('Dati ricevuti:', res.data.data);
                setVehicle(res.data.data)
            })
            .catch(err =>
                console.log(err)
                // if (err.status === 404) redirect('/404')
            )
    }
    // chiamata all'API al montaggio del componente
    useEffect(fetchVehicle, []);

    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detail-page">
            <div className="detail-container">
                <img
                    src={`http://127.0.0.1:8000/storage/${vehicle.image}`}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="detail-image"
                />

                <div className="detail-info">
                    <h1 className="detail-title">{vehicle.brand} {vehicle.model}</h1>

                    <span className={`availability-badge-detail ${vehicle.available === 1 ? 'available-detail' : 'not-available-detail'}`}>
                        {vehicle.available === 1 ? 'Disponibile' : 'Non disponibile'}
                    </span>

                    <div className="vehicle-details">
                        <p><strong>Tipo:</strong> {vehicle.type}</p>
                        <p>{vehicle.type !== 'Bike' ? (<><strong>Targa:</strong> {vehicle.plate}</>) : null}</p>
                        <p className="description"><strong>Descrizione:</strong> {vehicle.description}</p>
                        <p className="detail-price"><strong>Prezzo:</strong> €{vehicle.price_per_day}/giorno</p>
                    </div>

                    <Link to="/" className="back-home">← Torna alla Home</Link>

                </div>
            </div>
            <BookingForm vehicleId={vehicle.id} />
        </div>
    )
}

export default DetailPage