import "../../style/Persoonlijkheidstypes/Artistiek.css";
import artistiek from "../../assets/artistiek-type.png";
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

const Artistiek = () => {
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
					fetchStudierichtingen(undefined, undefined, ["Artistiek"]),
					fetchBeroepen(["Artistiek"])
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
		<div className="artistiek-page-container">
			<Navigatie />
			<div className="artistiek-container">
				<div className="artistiek-content-container">
					<div className="artistiek-text-content">
						{/* H1 Typewriter Effect */}
						<motion.h1>
							{"Artistiek".split("").map((char, index) => (
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
						<motion.p className="artistiek-subtitle">
							{"Met verbeelding verander jij de wereld"
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
							className="artistiek-text-content"
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 2.8 }}
						>
							<p>
								<span className="artistiek-bold">
									De artistieke persoonlijkheid
								</span>{" "}
								is een echte maker. Iemand die leeft om te creëren en zich het
								liefst bezighoudt met kunstzinnige en creatieve activiteiten.
								Met een rijke fantasie en een sterke drang tot expressie weet
								hij gevoelens, ideeën en verhalen vorm te geven in beeld,
								geluid, beweging of taal.
							</p>
							<p>
								Hij zoekt geen vaste structuren of regels, maar juist vrijheid
								om te experimenteren en zijn eigen stijl te ontwikkelen. Wat hij
								maakt hoeft niet perfect te zijn, zolang het maar oprecht en
								betekenisvol is. De wereld is voor hem een bron van inspiratie,
								en via zijn werk nodigt hij anderen uit om anders te kijken, te
								voelen en mee te dromen.
							</p>
						</motion.div>
					</div>
					<motion.div
						className="artistiek-image-content"
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<motion.img
							src={artistiek}
							alt="Artistiek type"
							style={{
								rotateX,
								rotateY,
								transformStyle: "preserve-3d",
								perspective: "1000px"
							}}
						/>
					</motion.div>
				</div>
				<div className="artistiek-scroll-indicator">
					{/* <span>Scroll beneden</span> */}
					<img
						src={arrowDown}
						alt="Scroll beneden"
						className="artistiek-arrow-icon"
					/>
				</div>
			</div>
			{!loading && studierichtingen.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<StudierichtingenCarousel
						studierichtingen={studierichtingen}
						showGrade={true}
						title={
							<div className="artistiek-section-title">
								<span style={{ color: "#A883CA" }}>Studierichtingen</span> voor
								Artistiek
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
							<div className="artistiek-section-title">
								<span style={{ color: "#A883CA" }}>Beroepen</span> voor
								Artistiek
							</div>
						}
					/>
				</div>
			)}
			<div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				<PersoonlijkheidTypesCarousel
					currentType="Artistiek"
					title={
						<div className="persoonlijkheid-carousel-title">Andere types</div>
					}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default Artistiek;
