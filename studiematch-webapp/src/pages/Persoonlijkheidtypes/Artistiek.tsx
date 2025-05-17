import "../../style/Persoonlijkheidstypes/Artistiek.css";
import artistiek from "../../assets/artistiek-type.png";
import arrowDown from "../../assets/arrow-down.svg";
import { motion } from "framer-motion";
import Navigatie from "../../components/Navigatie";
const Artistiek = () => {
	return (
		<div className="page-container">
			<Navigatie />
			<div className="persoonlijkheidstypes-artistiek">
				<div className="content-container">
					<div className="text-content">
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
						<motion.p className="subtitle">
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
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 1.8 }}
						>
							<p>
								<span className="bold">De artistieke persoonlijkheid</span> is
								een echte maker. Iemand die leeft om te creëren en zich het
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
						className="image-content"
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
					>
						<img src={artistiek} alt="Artistiek type" />
					</motion.div>
				</div>
				<div className="scroll-indicator">
					<img src={arrowDown} alt="Scroll beneden" className="arrow-icon" />
					<span>Scroll beneden</span>
				</div>
			</div>
		</div>
	);
};

export default Artistiek;
