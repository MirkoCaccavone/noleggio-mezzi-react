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

            <input type="text" name="customer_name" placeholder="Nome e Cognome" onChange={handleChange} required />
            <input type="email" name="customer_email" placeholder="Email" onChange={handleChange} required />
            <input type="date" name="start_date" onChange={handleChange} required />
            <input type="date" name="end_date" onChange={handleChange} required />

            <button type="submit">Prenota</button>

            {message && <p className="form-message">{message}</p>}
        </form>
    );
};

export default BookingForm;