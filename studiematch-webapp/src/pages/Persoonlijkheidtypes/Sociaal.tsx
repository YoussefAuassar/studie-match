import "../../style/Persoonlijkheidstypes/Sociaal.css";
import sociaal from "../../assets/sociaal-type.png";
import arrowDown from "../../assets/arrow-down.svg";
import { motion, useSpring } from "framer-motion";
import Navigatie from "../../components/Navigatie";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import StudierichtingenCarousel from "../../components/StudierichtingenCarousel";
import PersoonlijkheidTypesCarousel from "../../components/PersoonlijkheidTypesCarousel";
import {
	type Studierichting,
	type Beroep,
	fetchStudierichtingen,
	fetchBeroepen
} from "../../services/supabaseService";
import BeroepenCarousel from "../../components/BeroepenCarousel";

const Sociaal = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
	const [studierichtingen, setStudierichtingen] = useState<Studierichting[]>(
		[]
	);
	const [beroepen, setBeroepen] = useState<Beroep[]>([]);
	const [loading, setLoading] = useState(true);
	const springConfig = { stiffness: 300, damping: 30, mass: 1 };
	const rotateX = useSpring(0, springConfig);
	const rotateY = useSpring(0, springConfig);

	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true);
				const [studierichtingenData, beroepenData] = await Promise.all([
					fetchStudierichtingen(undefined, undefined, ["Sociaal"]),
					fetchBeroepen(["Sociaal"])
				]);

				setStudierichtingen(studierichtingenData);
				setBeroepen(beroepenData);
			} catch (err) {
				console.error("Error fetching data:", err);
			} finally {
				setLoading(false);
			}
		}

		loadData();
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } =
			e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - left) / width;
		const y = (e.clientY - top) / height;
		setMousePosition({ x, y });
	};

	useEffect(() => {
		const rotateXValue = (0.5 - mousePosition.y) * 35;
		const rotateYValue = (mousePosition.x - 0.5) * 35;
		rotateX.set(rotateXValue);
		rotateY.set(rotateYValue);
	}, [mousePosition, rotateX, rotateY]);

	const handleMouseLeave = () => {
		rotateX.set(0);
		rotateY.set(0);
	};

	return (
		<div className="sociaal-page-container">
			<Navigatie />
			<div className="sociaal-container">
				<div className="sociaal-content-container">
					<div className="sociaal-text-content">
						{/* H1 Typewriter Effect */}
						<motion.h1>
							{"Sociaal".split("").map((char, index) => (
								<motion.span
									key={index}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.1, delay: 0.2 + index * 0.1 }}
								>
									{char}
								</motion.span>
							))}
						</motion.h1>

						{/* Subtitle Typewriter Effect */}
						<motion.p className="sociaal-subtitle">
							{"Met zorg en verbinding maak jij het verschil"
								.split("")
								.map((char, index) => (
									<motion.span
										key={index}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.1, delay: 1.1 + index * 0.05 }}
									>
										{char}
									</motion.span>
								))}
						</motion.p>

						<motion.div
							className="sociaal-text-content"
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 2.8 }}
						>
							<p>
								<span className="sociaal-bold">De sociale persoonlijkheid</span>{" "}
								is een echte helper. Iemand die leeft om anderen te ondersteunen
								en zich het liefst bezighoudt met zorgzame en verbindende
								activiteiten. Met veel empathie en een sterk gevoel voor
								verantwoordelijkheid weet hij mensen te begeleiden, te motiveren
								en vertrouwen te geven.
							</p>
							<p>
								Hij zoekt geen competitie of afstand, maar juist contact,
								samenwerking en betrokkenheid. Wat hij doet hoeft niet groots of
								zichtbaar te zijn, zolang het maar oprecht en waardevol is voor
								de ander. De maatschappij is voor hem een plek waar je samen
								sterker staat, en via zijn inzet wil hij bijdragen aan een
								warmere, meer verbonden wereld.
							</p>
						</motion.div>
					</div>
					<motion.div
						className="sociaal-image-content"
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<motion.img
							src={sociaal}
							alt="Sociaal type"
							style={{
								rotateX,
								rotateY,
								transformStyle: "preserve-3d",
								perspective: "1000px"
							}}
						/>
					</motion.div>
				</div>
				<div className="sociaal-scroll-indicator">
					<img
						src={arrowDown}
						alt="Scroll beneden"
						className="sociaal-arrow-icon"
					/>
				</div>
			</div>
			{!loading && studierichtingen.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<StudierichtingenCarousel
						studierichtingen={studierichtingen}
						title={
							<div className="sociaal-section-title">
								<span style={{ color: "#87CA83" }}>Studierichtingen</span> voor
								Sociaal
							</div>
						}
					/>
				</div>
			)}
			{!loading && beroepen.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<BeroepenCarousel
						beroepen={beroepen}
						title={
							<div className="sociaal-section-title">
								<span style={{ color: "#87CA83" }}>Beroepen</span> voor Sociaal
							</div>
						}
					/>
				</div>
			)}
			<div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				<PersoonlijkheidTypesCarousel
					currentType="Sociaal"
					title={
						<div className="persoonlijkheid-carousel-title">Andere types</div>
					}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default Sociaal;

