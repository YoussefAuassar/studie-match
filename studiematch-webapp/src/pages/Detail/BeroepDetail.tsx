import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Beroep } from "../../services/supabaseService";
import { supabase, getImageUrl } from "../../services/supabaseService";
import Navigatie from "../../components/Navigatie";
import Footer from "../../components/Footer";
import "../../style/Detail/Beroepdetail.css";

const BeroepDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [beroep, setBeroep] = useState<Beroep | null>(null);

	useEffect(() => {
		const fetchBeroepDetail = async () => {
			if (!id) return;

			const { data, error } = await supabase
				.from("beroepen")
				.select("*")
				.eq("id", parseInt(id))
				.single();

			if (error) {
				console.error("Error fetching beroep:", error);
				return;
			}

			setBeroep(data);
		};

		fetchBeroepDetail();
	}, [id]);

	const handleStartTest = () => {
		navigate("/persoonlijkheidstestintro");
	};

	if (!beroep) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Navigatie />
			<div className="beroep-detail-container">
				<div className="beroep-hero-section">
					<img
						src={getImageUrl(beroep.afbeelding, "beroepen")}
						alt={beroep.naam_beroep}
						className="beroep-hero-image"
					/>
					<div className="beroep-hero-overlay">
						<div className="beroep-hero-overlay-content">
							<h1 className="beroep-hero-title">{beroep.naam_beroep}</h1>
						</div>
					</div>
				</div>

				<div className="beroep-content-section">
					<h1 className="beroep-content-title">
						Wat is, wat doet een {beroep.naam_beroep}?
					</h1>
					<p className="beroep-description">{beroep.beschrijving_beroep}</p>
				</div>

				<div className="beroep-test-banner-container">
					<div className="beroep-test-banner">
						<div className="beroep-test-banner-left">
							Benieuwd of deze <br />
							beroep bij jou past?
						</div>
						<div className="beroep-test-banner-right">
							<p className="beroep-test-banner-description">
								Doe de test en ontdek welke persoonlijkheid <br />
								jij hebt en of deze beroep bij jou past.
							</p>
							<button className="beroep-test-button" onClick={handleStartTest}>
								Start test
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default BeroepDetail;
