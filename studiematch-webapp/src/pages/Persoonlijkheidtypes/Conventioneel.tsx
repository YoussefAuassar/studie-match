import "../../style/Persoonlijkheidstypes/Conventioneel.css";
import conventioneel from "../../assets/conventioneel-type.png";
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

const Conventioneel = () => {
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
					fetchStudierichtingen(undefined, undefined, ["Conventioneel"]),
					fetchBeroepen(["Conventioneel"])
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
		<div className="conventioneel-page-container">
			<Navigatie />
			<div className="conventioneel-container">
				<div className="conventioneel-content-container">
					<div className="conventioneel-text-content">
						{/* H1 Typewriter Effect */}
						<motion.h1>
							{"Conventioneel".split("").map((char, index) => (
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
						<motion.p className="conventioneel-subtitle">
							{"Met structuur en precisie breng jij orde in de chaos"
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
							className="conventioneel-text-content"
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 2.8 }}
						>
							<p>
								<span className="conventioneel-bold">
									De conventionele persoonlijkheid
								</span>{" "}
								is een echte organisator. Iemand die houdt van duidelijkheid,
								orde en systemen, en zich het liefst bezighoudt met
								gestructureerd en administratief werk. Met oog voor detail en
								een sterk verantwoordelijkheidsgevoel zorgt hij dat alles
								correct verloopt, van cijfers tot planningen.
							</p>
							<p>
								Hij zoekt geen onzekerheid of creatief experiment, maar
								duidelijkheid, stabiliteit en regels. Wat hij doet hoeft niet
								opvallend te zijn, zolang het maar efficiënt, nauwkeurig en
								betrouwbaar is. De wereld is voor hem een plek die georganiseerd
								moet worden en via zijn werk maakt hij processen vlotter,
								overzichtelijker en voorspelbaarder.
							</p>
						</motion.div>
					</div>
					<motion.div
						className="conventioneel-image-content"
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<motion.img
							src={conventioneel}
							alt="Conventioneel type"
							style={{
								rotateX,
								rotateY,
								transformStyle: "preserve-3d",
								perspective: "1000px"
							}}
						/>
					</motion.div>
				</div>
				<div className="conventioneel-scroll-indicator">
					<img
						src={arrowDown}
						alt="Scroll beneden"
						className="conventioneel-arrow-icon"
					/>
				</div>
			</div>
			{!loading && studierichtingen.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<StudierichtingenCarousel
						studierichtingen={studierichtingen}
						title={
							<div className="conventioneel-section-title">
								<span style={{ color: "#009298" }}>Studierichtingen</span> voor
								Conventioneel
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
							<div className="conventioneel-section-title">
								<span style={{ color: "#009298" }}>Beroepen</span> voor
								Conventioneel
							</div>
						}
					/>
				</div>
			)}
			<div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				<PersoonlijkheidTypesCarousel
					currentType="Conventioneel"
					title={
						<div className="persoonlijkheid-carousel-title">Andere types</div>
					}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default Conventioneel;
