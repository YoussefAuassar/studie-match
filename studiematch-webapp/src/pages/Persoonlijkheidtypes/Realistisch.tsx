import "../../style/Persoonlijkheidstypes/Realistisch.css";
import realistisch from "../../assets/realistisch-type.png";
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

const Realistisch = () => {
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
					fetchStudierichtingen(undefined, undefined, ["Realistisch"]),
					fetchBeroepen(["Realistisch"])
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
		<div className="realistisch-page-container">
			<Navigatie />
			<div className="realistisch-container">
				<div className="realistisch-content-container">
					<div className="realistisch-text-content">
						{/* H1 Typewriter Effect */}
						<motion.h1>
							{"Realistisch".split("").map((char, index) => (
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
						<motion.p className="realistisch-subtitle">
							{"Met jouw handen bouw je aan een tastbare wereld"
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
							className="realistisch-text-content"
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 2.8 }}
						>
							<p>
								<span className="realistisch-bold">
									De realistische persoonlijkheid
								</span>{" "}
								is een doener. Iemand die houdt van aanpakken en zich het liefst
								bezighoudt met praktische en fysieke taken. Met een sterke focus
								op de werkelijkheid en een voorkeur voor actie, werkt hij graag
								met zijn handen, machines, gereedschap of technische systemen.
							</p>
							<p>
								Hij zoekt geen theoretische concepten of abstracte ideeën, maar
								duidelijke taken en concrete resultaten. Wat hij doet hoeft niet
								ingewikkeld te zijn, zolang het maar nuttig en functioneel is.
								De wereld is voor hem een plek om te bouwen, te repareren en te
								verbeteren – en via zijn werk maakt hij het leven van anderen
								praktischer en beter.
							</p>
						</motion.div>
					</div>
					<motion.div
						className="realistisch-image-content"
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						<motion.img
							src={realistisch}
							alt="Realistisch type"
							style={{
								rotateX,
								rotateY,
								transformStyle: "preserve-3d",
								perspective: "1000px"
							}}
						/>
					</motion.div>
				</div>
				<div className="realistisch-scroll-indicator">
					<img
						src={arrowDown}
						alt="Scroll beneden"
						className="realistisch-arrow-icon"
					/>
				</div>
			</div>
			{!loading && studierichtingen.length > 0 && (
				<div style={{ marginTop: "2rem" }}>
					<StudierichtingenCarousel
						studierichtingen={studierichtingen}
						showGrade={true}
						title={
							<div className="realistisch-section-title">
								<span style={{ color: "#48A6BB" }}>Studierichtingen</span> voor
								Realistisch
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
							<div className="realistisch-section-title">
								<span style={{ color: "#48A6BB" }}>Beroepen</span> voor
								Realistisch
							</div>
						}
					/>
				</div>
			)}
			<div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				<PersoonlijkheidTypesCarousel
					currentType="Realistisch"
					title={
						<div className="persoonlijkheid-carousel-title">Andere types</div>
					}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default Realistisch;
