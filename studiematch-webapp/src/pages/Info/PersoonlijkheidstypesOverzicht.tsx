import "../../style/Info/Persoonlijkheidstypesoverzicht.css";
import { useNavigate } from "react-router-dom";
import artistiek from "../../assets/artistiek-type.png";
import sociaal from "../../assets/sociaal-type.png";
import ondernemend from "../../assets/ondernemend-type.png";
import realistisch from "../../assets/realistisch-type.png";
import onderzoeker from "../../assets/onderzoeker-type.png";
import conventioneel from "../../assets/conventioneel-type.png";
import Navigatie from "../../components/Navigatie";
import { motion } from "framer-motion";

const PersoonlijkheidstypesOverzicht = () => {
	const navigate = useNavigate();

	const containerAnimation = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.3
			}
		}
	};

	const imageAnimation = {
		hidden: { opacity: 0, y: 50 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut"
			}
		}
	};

	return (
		<>
			<Navigatie />
			<div className="persoonlijkheidstypes-overzicht">
				<motion.div
					className="persoonlijkheidstypes-overzicht-grid"
					variants={containerAnimation}
					initial="hidden"
					animate="show"
				>
					<div
						className="persoonlijkheidstypes-overzicht-square"
						style={{ backgroundColor: "#A883CA", cursor: "pointer" }}
						onClick={() => navigate("/artistiek")}
					>
						<motion.img
							src={artistiek}
							alt="artistiek type"
							variants={imageAnimation}
						/>
						<h1 className="persoonlijkheidstypes-overzicht-square-text">
							Artistiek
						</h1>
					</div>
					<div
						className="persoonlijkheidstypes-overzicht-square"
						style={{ backgroundColor: "#48A6BB", cursor: "pointer" }}
						onClick={() => navigate("/realistisch")}
					>
						<motion.img
							src={realistisch}
							alt="realistisch type"
							variants={imageAnimation}
						/>
						<h1 className="persoonlijkheidstypes-overzicht-square-text">
							Realistisch
						</h1>
					</div>
					<div
						className="persoonlijkheidstypes-overzicht-square"
						style={{ backgroundColor: "#87CA83", cursor: "pointer" }}
						onClick={() => navigate("/sociaal")}
					>
						<motion.img
							src={sociaal}
							alt="sociaal type"
							variants={imageAnimation}
						/>
						<h1 className="persoonlijkheidstypes-overzicht-square-text">
							Sociaal
						</h1>
					</div>
					<div
						className="persoonlijkheidstypes-overzicht-square"
						style={{ backgroundColor: "#FF6366", cursor: "pointer" }}
						onClick={() => navigate("/ondernemend")}
					>
						<motion.img
							src={ondernemend}
							alt="ondernemend type"
							variants={imageAnimation}
						/>
						<h1 className="persoonlijkheidstypes-overzicht-square-text">
							Ondernemend
						</h1>
					</div>
					<div
						className="persoonlijkheidstypes-overzicht-square"
						style={{ backgroundColor: "#5C4E9B", cursor: "pointer" }}
						onClick={() => navigate("/onderzoeker")}
					>
						<motion.img
							src={onderzoeker}
							alt="onderzoeker type"
							variants={imageAnimation}
						/>
						<h1 className="persoonlijkheidstypes-overzicht-square-text">
							Onderzoeker
						</h1>
					</div>
					<div
						className="persoonlijkheidstypes-overzicht-square"
						style={{ backgroundColor: "#009298", cursor: "pointer" }}
						onClick={() => navigate("/conventioneel")}
					>
						<motion.img
							src={conventioneel}
							alt="conventioneel type"
							variants={imageAnimation}
						/>
						<h1 className="persoonlijkheidstypes-overzicht-square-text">
							Conventioneel
						</h1>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default PersoonlijkheidstypesOverzicht;
