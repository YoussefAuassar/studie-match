import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Studierichting } from "../../services/supabaseService";
import { supabase, getImageUrl } from "../../services/supabaseService";
import Navigatie from "../../components/Navigatie";
import Footer from "../../components/Footer";
import "../../style/Detail/Studierichtingdetail.css";
import iconCompas from "../../assets/icon-compas.svg";
import diplomaIcon from "../../assets/diploma-icon.svg";

const StudierichtingDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [studierichting, setStudierichting] = useState<Studierichting | null>(
		null
	);

	useEffect(() => {
		const fetchStudierichtingDetail = async () => {
			if (!id) return;

			const { data, error } = await supabase
				.from("studierichtingen")
				.select("*")
				.eq("id", parseInt(id))
				.single();

			if (error) {
				console.error("Error fetching studierichting:", error);
				return;
			}

			setStudierichting(data);
		};

		fetchStudierichtingDetail();
	}, [id]);

	const handleStartTest = () => {
		navigate("/persoonlijkheidstestintro");
	};

	const getGradeText = (grade: number) => {
		switch (grade) {
			case 1:
				return "1ste Graad";
			case 2:
				return "2de Graad";
			case 3:
				return "3de Graad";
			default:
				return `${grade}de Graad`;
		}
	};

	if (!studierichting) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Navigatie />
			<div className="studierichting-detail-container">
				<div className="studierichting-hero-section">
					<img
						src={getImageUrl(studierichting.afbeelding, "studierichtingen")}
						alt={studierichting.naam_richting}
						className="studierichting-hero-image"
					/>
					<div className="studierichting-hero-overlay">
						<div className="studierichting-hero-overlay-content">
							<div className="studierichting-grade-indicator">
								{getGradeText(studierichting.graad)}
							</div>
							<h1 className="studierichting-hero-title">
								{studierichting.naam_richting}
							</h1>
						</div>
					</div>
				</div>
				<div className="studierichting-info-section">
					<div className="studierichting-info-box">
						<div className="studierichting-info-icon-wrapper with-background">
							<span className="studierichting-year-number">
								{studierichting.jaren[0]}
							</span>
						</div>
						<div className="studierichting-info-content">
							<div className="studierichting-info-label">Jaar</div>
							<div className="studierichting-info-value">
								{studierichting.jaren[0]}e jaar
							</div>
						</div>
					</div>

					<div className="studierichting-info-box">
						<div className="studierichting-info-icon-wrapper">
							<img
								src={iconCompas}
								alt="Studiedomein"
								className="studierichting-info-icon large"
							/>
						</div>
						<div className="studierichting-info-content">
							<div className="studierichting-info-label">Studiedomein</div>
							<div className="studierichting-info-value">
								{studierichting.studiedomein || "Geen studiedomein"}
							</div>
						</div>
					</div>

					<div className="studierichting-info-box">
						<div className="studierichting-info-icon-wrapper">
							<img
								src={diplomaIcon}
								alt="Finaliteit"
								className="studierichting-info-icon large diploma"
							/>
						</div>
						<div className="studierichting-info-content">
							<div className="studierichting-info-label">Finaliteit</div>
							<div className="studierichting-info-value">
								{studierichting.finaliteit || "Geen finaliteit"}
							</div>
						</div>
					</div>
				</div>
				<div className="studierichting-content-section">
					<h1 className="studierichting-content-title">Over deze richting?</h1>
					<p className="studierichting-description">
						{studierichting.beschrijving_richting}
					</p>
				</div>
				<div className="studierichting-test-banner-container">
					<div className="studierichting-test-banner">
						<div className="studierichting-test-banner-left">
							Benieuwd of deze <br />
							richting bij jou past?
						</div>
						<div className="studierichting-test-banner-right">
							<p className="studierichting-test-banner-description">
								Doe de test en ontdek welke persoonlijkheid <br />
								jij hebt en of deze studierichting bij jou past.
							</p>
							<button
								className="studierichting-test-button"
								onClick={handleStartTest}
							>
								Start test
							</button>
						</div>
					</div>
				</div>
				<div className="studierichting-lessen-inhoud">
					<h1>Welke lessen krijg je?</h1>
					<div className="studierichting-lessen-content">
						<p>
							<strong>Lesseninhoud per School</strong>
						</p>
						<p>
							De lesinhouden verschillen van school tot school. Scholen hebben
							een grote vrijheid om het lessenpakket te organiseren. Je kan
							ervan uitgaan dat de lessen bestaan uit:
						</p>
						<ul>
							<li>
								<strong>Basisvorming:</strong> Dit is hetzelfde voor elke
								leerling in hetzelfde leerjaar en studierichting met dezelfde
								finaliteit.
							</li>
							<li>
								<strong>Studierichting-specifieke Vorming:</strong> Vakken die
								specifiek gericht zijn op de gekozen studierichting.
							</li>
							<li>
								<strong>Vrije Uurtjes:</strong> De school kan zelf invulling
								geven aan enkele uurtjes in het rooster.
							</li>
						</ul>
						<p>
							Gedetailleerde informatie vind je op de websites van de scholen.
						</p>
						<p>
							Meer informatie over de inhoud, competenties en doelstellingen
							lees je in het
							<a
								href="https://www.opleidingsinhouden-app.onderwijs-apps.vlaanderen.be/?niveau=SO"
								target="_blank"
								rel="noopener noreferrer"
							>
								curriculumdossier
							</a>
							.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default StudierichtingDetail;
