import React from "react";
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
					<a href="" className="footer-link">
						Start Test
					</a>
					<a href="" className="footer-link">
						Opleidingen
					</a>
					<a href="" className="footer-link">
						Persoonlijkheidtypes
					</a>
					<a href="" className="footer-link">
						Over Studie Match
					</a>
					<a href="" className="footer-link">
						Stubbie
					</a>
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
