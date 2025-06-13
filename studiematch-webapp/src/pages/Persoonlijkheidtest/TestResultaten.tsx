import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Navigate, Link } from "react-router-dom";
import "../../style/Persoonlijkheidtest/Testresultaten.css";
import artistiek from "../../assets/artistiek-type.png";
import sociaal from "../../assets/sociaal-type.png";
import ondernemend from "../../assets/ondernemend-type.png";
import realistisch from "../../assets/realistisch-type.png";
import onderzoeker from "../../assets/onderzoeker-type.png";
import conventioneel from "../../assets/conventioneel-type.png";
import Navigatie from "../../components/Navigatie";
import StudierichtingenCarousel from "../../components/StudierichtingenCarousel";
import BeroepenCarousel from "../../components/BeroepenCarousel";
import TestResultsPDF from "../../components/TestResultsPDF";
import Footer from "../../components/Footer";
import {
	type Studierichting,
	type Beroep,
	fetchStudierichtingen,
	fetchBeroepen
} from "../../services/supabaseService";

interface PersonalityType {
	name: string;
	percentage: number;
	className: string;
}

const getImageForType = (type: string) => {
	switch (type.toLowerCase()) {
		case "artistiek":
			return artistiek;
		case "sociaal":
			return sociaal;
		case "ondernemend":
			return ondernemend;
		case "realistisch":
			return realistisch;
		case "onderzoeker":
			return onderzoeker;
		case "conventioneel":
			return conventioneel;
		default:
			return artistiek;
	}
};

const getTypeLink = (type: string) => {
	return `/${type.toLowerCase()}`;
};

const TestResultaten = () => {
	const location = useLocation();
	const results = location.state?.results;
	const selectedGraad = location.state?.graad;
	const selectedJaar = location.state?.jaar;
	const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(
		results ? results.map(() => 0) : []
	);
	const [studierichtingen, setStudierichtingen] = useState<Studierichting[]>(
		[]
	);
	const [beroepen, setBeroepen] = useState<Beroep[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			if (!results) return;

			setLoading(true);
			try {
				// Get the top 3 personality types
				const topTypes = results
					.sort(
						(a: PersonalityType, b: PersonalityType) =>
							b.percentage - a.percentage
					)
					.slice(0, 3)
					.map((type: PersonalityType) => type.name);

				// Fetch studierichtingen based on graad, jaar, and personality types
				const studierichtingenData = await fetchStudierichtingen(
					selectedGraad,
					selectedJaar,
					topTypes
				);
				// Filter the personality types for each studierichting to only show matching top types
				const filteredStudierichtingen = studierichtingenData.map(
					(studierichting) => ({
						...studierichting,
						persoonlijkheidstype: studierichting.persoonlijkheidstype.filter(
							(type) => topTypes.includes(type)
						)
					})
				);
				setStudierichtingen(filteredStudierichtingen);

				const beroepenData = await fetchBeroepen(topTypes);

				const filteredBeroepen = beroepenData.map((beroep) => ({
					...beroep,
					persoonlijkheidstype: beroep.persoonlijkheidstype.filter((type) =>
						topTypes.includes(type)
					)
				}));
				setBeroepen(filteredBeroepen);
			} catch (error) {
				console.error("Error loading data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [results, selectedGraad, selectedJaar]);

	useEffect(() => {
		if (!results) return;

		const animationDuration = 1500;
		const steps = 60;
		const interval = animationDuration / steps;

		const animations = results.map((type: PersonalityType, index: number) => {
			let currentStep = 0;
			return setInterval(() => {
				if (currentStep < steps) {
					setAnimatedPercentages((prev) => {
						const newPercentages = [...prev];
						newPercentages[index] = Math.min(
							Math.round((type.percentage * currentStep) / steps),
							type.percentage
						);
						return newPercentages;
					});
					currentStep++;
				}
			}, interval);
		});

		return () => {
			animations.forEach((interval: number) => clearInterval(interval));
		};
	}, [results]);

	if (!results) {
		return <Navigate to="/persoonlijkheidstest" replace />;
	}

	return (
		<>
			<div className="ptest-results-container">
				<Navigatie />
				<h1 className="ptest-results-title">Jouw persoonlijkheidstype</h1>
				<div className="ptest-results-grid">
					{results.map((type: PersonalityType, index: number) => (
						<Link
							to={getTypeLink(type.name)}
							key={type.name}
							className={`ptest-results-card ptest-results-${type.className}`}
							style={{ textDecoration: "none" }}
						>
							<h2 className="ptest-results-name">{type.name}</h2>
							<img
								src={getImageForType(type.name)}
								alt={type.name}
								className={`ptest-results-image ${
									type.name.toLowerCase() === "realistisch"
										? "ptest-results-image-realistisch"
										: ""
								}`}
							/>
							<motion.div
								className="ptest-results-percentage"
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								transition={{ delay: index * 0.2 + 0.5 }}
							>
								{animatedPercentages[index]}%
							</motion.div>
						</Link>
					))}
				</div>
			</div>
			{!loading && (
				<>
					{studierichtingen.length > 0 && (
						<div className="studierichtingen-section">
							<StudierichtingenCarousel
								studierichtingen={studierichtingen}
								title={
									<h1 className="studierichtingen-section-title">
										Studierichtingen voor jou
									</h1>
								}
								showPersonalityIndicators={true}
								selectedYear={selectedJaar}
							/>
						</div>
					)}
					{beroepen.length > 0 && (
						<div className="studierichtingen-section">
							<BeroepenCarousel
								beroepen={beroepen}
								title={
									<h1 className="studierichtingen-section-title">
										Bijpassende beroepen
									</h1>
								}
								showPersonalityIndicators={true}
							/>
						</div>
					)}
					<div className="download-section">
						<TestResultsPDF
							results={results}
							studierichtingen={studierichtingen}
							graad={selectedGraad}
							jaar={selectedJaar}
						/>
					</div>
				</>
			)}
			<div className="ptest-results-footer">
				<Footer />
			</div>
		</>
	);
};

export default TestResultaten;
