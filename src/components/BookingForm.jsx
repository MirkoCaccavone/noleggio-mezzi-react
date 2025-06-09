import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/BookingForm.css";
import "../style/custom-datepicker.css"

const BookingForm = ({ vehicleId }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        start_date: null,
        end_date: null,
        vehicle_id: vehicleId,
    });

    const [bookedDates, setBookedDates] = useState([]);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            vehicle_id: vehicleId
        }));

        if (vehicleId) {
            axios.get(`http://127.0.0.1:8000/api/vehicles/${vehicleId}/booked-dates`)
                .then(res => {
                    const dates = res.data.map(date => new Date(date));
                    setBookedDates(dates);
                })
                .catch(err => {
                    console.error('Errore nel recupero delle date prenotate:', err);
                });
        }
    }, [vehicleId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { customer_name, customer_email, start_date, end_date } = formData;

        if (!start_date || !end_date) {
            setMessage("Seleziona sia la data di inizio che di fine.");
            return;
        }

        if (start_date > end_date) {
            setMessage("La data di inizio non può essere successiva alla data di fine.");
            return;
        }

        // Genera le date selezionate
        const selectedDates = [];
        const current = new Date(start_date);
        while (current <= end_date) {
            selectedDates.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
        }

        const formattedBooked = bookedDates.map(date =>
            date.toISOString().split('T')[0]
        );

        const overlapping = selectedDates.some(date => formattedBooked.includes(date));

        if (overlapping) {
            setMessage("Le date selezionate includono giorni già prenotati.");
            return;
        }

        // Invia prenotazione
        axios.post('http://127.0.0.1:8000/api/bookings', {
            ...formData,
            start_date: formData.start_date.toISOString().split('T')[0],
            end_date: formData.end_date.toISOString().split('T')[0],
        })
            .then(() => {
                setMessage("Prenotazione inviata con successo!");
                setFormData({
                    customer_name: '',
                    customer_email: '',
                    start_date: null,
                    end_date: null,
                    vehicle_id: vehicleId,
                });
            })
            .catch(err => {
                console.error(err);
                setMessage("Errore durante la prenotazione.");
            });
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Prenota il tuo veicolo</h2>

            <div className="form-group">
                <label htmlFor="customer_name">Nome e Cognome</label>
                <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="customer_email">Email</label>
                <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Data inizio</label>
                    <DatePicker
                        selected={formData.start_date}
                        onChange={(date) => setFormData({ ...formData, start_date: date })}
                        excludeDates={bookedDates}
                        minDate={new Date()}
                        placeholderText="Seleziona data inizio"
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Data fine</label>
                    <DatePicker
                        selected={formData.end_date}
                        onChange={(date) => setFormData({ ...formData, end_date: date })}
                        excludeDates={bookedDates}
                        minDate={formData.start_date || new Date()}
                        placeholderText="Seleziona data fine"
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </div>
            </div>

            <button type="submit">Prenota</button>

            {message && <p className="form-message">{message}</p>}
        </form>
    );
};

export default BookingForm;

