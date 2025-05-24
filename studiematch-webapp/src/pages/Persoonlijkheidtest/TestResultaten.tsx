import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Navigate, Link } from "react-router-dom";
import "../../style/Persoonlijkheidtest/Testresultaten.css";
import artistiek from "../../assets/artistiek-type.png";
import sociaal from "../../assets/sociaal-type.png";
import ondernemend from "../../assets/ondernemend-type.png";
import Navigatie from "../../components/Navigatie";

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
	const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([
		0, 0, 0
	]);

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
							className="ptest-results-image"
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
	);
};

export default TestResultaten;
