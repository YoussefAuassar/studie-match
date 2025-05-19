import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-studiematch-normal.svg";
import "./../Style/Home/Navigatie.css";

const Navigatie: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleNavigation = (path: string) => {
		navigate(path);
		setMenuOpen(false);
	};

	return (
		<nav className="navigation">
			<div
				className="logo-container"
				onClick={() => navigate("/")}
				style={{ cursor: "pointer" }}
			>
				<img src={logo} alt="StudieMatch Logo" className="logo" />
			</div>
			<div
				className={`hamburger-menu ${menuOpen ? "open" : ""}`}
				onClick={toggleMenu}
			>
				<span className="hamburger-line"></span>
				<span className="hamburger-line"></span>
				<span className="hamburger-line"></span>
			</div>
			<div className={`side-menu ${menuOpen ? "open" : ""}`}>
				<ul className="menu-items">
					<li
						className="menu-item"
						onClick={() => handleNavigation("/persoonlijkheidstestintro")}
					>
						<h3>Start Test</h3>
						<p>Ontdek welke studierichting bij jou past</p>
					</li>
					<li className="menu-item">
						<h3>Opleidingen</h3>
						<p>Bekijk een overzicht van alle opleidingen</p>
					</li>
					<li
						className="menu-item"
						onClick={() => handleNavigation("/persoonlijkheidstypes")}
					>
						<h3>Persoonlijkheidstypes</h3>
						<p>Maak kennis met de 6 persoonlijkheidstypes</p>
					</li>
					<li className="menu-item">
						<h3>Over Studie Match</h3>
						<p>De missie achter Studdiematch</p>
					</li>
					<li className="menu-item">
						<h3>Stubbie</h3>
						<p>Jouw AI-studiebegeleider</p>
					</li>
				</ul>
			</div>
			{menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
		</nav>
	);
};

export default Navigatie;
