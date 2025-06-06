import axios from "axios"

import { useState, useEffect } from "react"
import VehicleCard from "../components/VehicleCard";

import '../style/HomePage.css';


const HomePage = () => {

    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = () => {
        axios.get('http://127.0.0.1:8000/api/vehicles')
            .then(res => {
                // console.log('Dati ricevuti:', res.data.data);
                setVehicles(res.data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(fetchVehicles, []);




    return (
        <div className="homePage-container">
            {vehicles.map((vehicle) => (
                <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                />
            ))}
        </div>
    )
}

export default HomePage