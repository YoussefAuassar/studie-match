import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-studiematch-normal.svg";
import "./../Style/Home/Footer.css";
import arrow from "../assets/arrow-footer.svg";

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-logo-container">
					<img src={logo} alt="StudieMatch Logo" className="footer-logo" />
				</div>
				<div className="footer-links">
					<Link to="/" className="footer-link">
						Homepagina
					</Link>
					<Link to="/persoonlijkheidstestintro" className="footer-link">
						Start Test
					</Link>
					<Link to="/filter-studierichtingen" className="footer-link">
						Studierichtingen
					</Link>
					<Link to="/persoonlijkheidstypes" className="footer-link">
						Persoonlijkheidstypes
					</Link>
					<Link to="/over-ons" className="footer-link">
						Over Studie Match
					</Link>
				</div>
			</div>
			<div className="footer-bottom-container">
				<div className="footer-copyright">© Studie Match l 2025</div>
				<div className="footer-arrow-container">
					<img src={arrow} alt="Arrow" className="footer-arrow" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
