import { useState, useEffect } from "react";
import axios from "axios";
import '../style/BookingForm.css'

const BookingForm = ({ vehicleId }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        start_date: '',
        end_date: '',
        vehicle_id: vehicleId,
    });

    const [message, setMessage] = useState('');

    // Aggiorna vehicle_id quando cambia vehicleId
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            vehicle_id: vehicleId
        }));
    }, [vehicleId]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica che vehicle_id sia presente
        if (!formData.vehicle_id) {
            setMessage('Errore: ID veicolo mancante');
            return;
        }

        console.log('Dati da inviare:', formData);

        axios.post('http://127.0.0.1:8000/api/bookings', formData)
            .then(res => {
                console.log('Risposta:', res.data);
                setMessage('Prenotazione inviata con successo!');
                // Reset form
                setFormData({
                    customer_name: '',
                    customer_email: '',
                    start_date: '',
                    end_date: '',
                    vehicle_id: vehicleId,
                });
            })
            .catch(err => {
                console.error('Errore dettagliato:', err.response?.data);
                setMessage(`Errore durante la prenotazione: ${err.response?.data?.message || err.message}`);
            });
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Prenota il tuo veicolo</h2>

            <div className="form-group">
                <label htmlFor="customer_name">Nome e Cognome</label>
                <input type="text" id="customer_name" name="customer_name" onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="customer_email">Email</label>
                <input type="email" id="customer_email" name="customer_email" onChange={handleChange} required />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="start_date">Data inizio</label>
                    <input type="date" id="start_date" name="start_date" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="end_date">Data fine</label>
                    <input type="date" id="end_date" name="end_date" onChange={handleChange} required />
                </div>
            </div>

            <button type="submit">Prenota</button>

            {message && <p className="form-message">{message}</p>}
        </form>
    );
};

export default BookingForm;