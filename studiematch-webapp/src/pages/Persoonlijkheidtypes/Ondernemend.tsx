import "../../style/Persoonlijkheidstypes/Ondernemend.css";
import ondernemend from "../../assets/ondernemend-type.png";
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

const Ondernemend = () => {
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
					fetchStudierichtingen(undefined, undefined, ["Ondernemend"]),
					fetchBeroepen(["Ondernemend"])
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
		<div className="ondernemend-page-container">
			<Navigatie />
			<div className="ondernemend-container">
				<div className="ondernemend-content-container">
					<div className="ondernemend-text-content">
						{/* H1 Typewriter Effect */}
						<motion.h1>
							{"Ondernemend".split("").map((char, index) => (
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
						<motion.p className="ondernemend-subtitle">
							{"Met visie en overtuiging breng jij ideeën tot leven"
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
							className="ondernemend-text-content"
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 2.8 }}
						>
							<p>
								<span className="ondernemend-bold">
									De ondernemende persoonlijkheid
								</span>{" "}
								is een geboren leider. Iemand die graag het voortouw neemt en
								zich het liefst bezighoudt met overtuigen, organiseren en
								initiatieven opzetten. Met een flinke dosis zelfvertrouwen en
								doorzettingsvermogen weet hij mensen in beweging te brengen en
								doelen na te streven.
							</p>
							<p>
								Hij zoekt geen vaste routine of uitvoerend werk, maar dynamiek,
								uitdaging en invloed. Wat hij onderneemt hoeft niet zonder
								risico te zijn, zolang het maar kansen biedt en resultaat
								oplevert. De wereld is voor hem een speelveld vol mogelijkheden,
								en via zijn acties inspireert hij anderen om te geloven, te
								volgen en te groeien.
							</p>
						</motion.div>
					</div>
					<motion.div
						className="ondernemend-image-content"
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<motion.img
							src={ondernemend}
							alt="Ondernemend type"
							style={{
								rotateX,
								rotateY,
								transformStyle: "preserve-3d",
								perspective: "1000px"
							}}
						/>
					</motion.div>
				</div>
				<div className="ondernemend-scroll-indicator">
					<img
						src={arrowDown}
						alt="Scroll beneden"
						className="ondernemend-arrow-icon"
					/>
				</div>
			</div>
			{!loading && studierichtingen.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<StudierichtingenCarousel
						studierichtingen={studierichtingen}
						title={
							<div className="ondernemend-section-title">
								<span style={{ color: "#FF6366" }}>Studierichtingen</span> voor
								Ondernemend
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
							<div className="ondernemend-section-title">
								<span style={{ color: "#FF6366" }}>Beroepen</span> voor
								Ondernemend
							</div>
						}
					/>
				</div>
			)}
			<div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				<PersoonlijkheidTypesCarousel
					currentType="Ondernemend"
					title={
						<div className="persoonlijkheid-carousel-title">Andere types</div>
					}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default Ondernemend;

