import { Link } from "react-router-dom";

import '../style/Footer.css'

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>Rentora</h3>
                    <p>Your trusted vehicle rental service. Find the perfect ride for every journey.</p>
                </div>

                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Homepage</Link></li>
                        <li><Link to="/vehicles">Vehicles</Link></li>
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <p>Email: support@rentora.com</p>
                    <p>Phone: +1 234 567 890</p>
                    <p>Address: 123 Main St, City, Country</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 Rentora. All rights reserved.</p>
                <p>Created by Mirko Caccavone</p>
            </div>
        </footer>
    );
}
