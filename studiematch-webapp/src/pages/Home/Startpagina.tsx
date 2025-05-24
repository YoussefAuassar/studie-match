import "../../Style/Home/Startpagina.css";
import Navigatie from "../../components/Navigatie";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import studentMetPet from "../../assets/student-met-pet.png";
import studentOpTrap from "../../assets/studenten-op-trap.png";
import johnHolland from "../../assets/john-holland.jpg";
import kinderenLopen from "../../assets/kinderen-lopen.png";
import kinderenTafel from "../../assets/kinderen-tafel.png";
import PrintingKids from "../../assets/Printing-kinderen.png";
import arrowDown from "../../assets/arrow-down.svg";

const Startpagina = () => {
	return (
		<>
			<Navigatie />
			<div className="startpagina">
				<div className="startpagina-content">
					{/* Hero sectie */}
					<section className="startpagina-hero">
						<div className="startpagina-hero-left startpagina-hero-col">
							<img
								src={studentMetPet}
								alt="Student lachend"
								className="startpagina-hero-img"
							/>
						</div>
						<div className="startpagina-hero-center startpagina-hero-col">
							<div className="startpagina-hero-rectangle">
								<h1 className="startpagina-hero-title">
									<motion.span
										className="startpagina-hero-line startpagina-hero-line-ontdek"
										initial={{ opacity: 0, x: 100, rotate: 5 }}
										animate={{ opacity: 1, x: 0, rotate: 5 }}
										transition={{ duration: 0.8, delay: 0.2 }}
									>
										Ontdek jouw
									</motion.span>

									<motion.span
										className="startpagina-hero-line startpagina-hero-line-ideale"
										initial={{ opacity: 0, x: -100, rotate: 0 }}
										animate={{ opacity: 1, x: 0, rotate: 0 }}
										transition={{ duration: 0.8, delay: 1 }}
									>
										ideale
									</motion.span>

									<motion.span
										className="startpagina-hero-line startpagina-hero-line-studierichting"
										initial={{ opacity: 0, x: 100, rotate: -3 }}
										animate={{ opacity: 1, x: 0, rotate: -3 }}
										transition={{ duration: 0.8, delay: 1.8 }}
									>
										studierichting!
									</motion.span>
								</h1>
								<p className="startpagina-hero-subtitle">
									Voor studenten in het secundair onderwijs.
								</p>
								<button className="startpagina-btn startpagina-btn-outline">
									Start test
								</button>
							</div>
						</div>
						<div className="startpagina-hero-right startpagina-hero-col">
							<img
								src={studentOpTrap}
								alt="Groep studenten"
								className="startpagina-hero-img"
							/>
						</div>
						{/* Scroll indicator */}
						<div className="startpagina-scroll-indicator">
							<img
								src={arrowDown}
								alt="Scroll beneden"
								className="startpagina-arrow-icon"
							/>
							<span>Scroll beneden</span>
						</div>
					</section>

					{/* Uitleg sectie */}
					<motion.section
						className="startpagina-uitleg"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Vind een{" "}
							<span className="startpagina-highlight">studierichting</span>{" "}
							<br />
							die bij je past en waarin jij uitblinkt <br />
							met onze persoonlijkheidstest
						</motion.h2>
						<motion.div
							className="startpagina-uitleg-fotos"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<motion.img
								src={kinderenTafel}
								alt="Studenten techniek"
								className="startpagina-uitleg-img startpagina-uitleg-img-left"
								initial={{ opacity: 0, y: -100, rotate: -20 }}
								whileInView={{ opacity: 1, y: 0, rotate: -20 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.5 }}
							/>
							<motion.img
								src={kinderenLopen}
								alt="Studenten rennen"
								className="startpagina-uitleg-img startpagina-uitleg-img-center"
								initial={{ opacity: 0, y: -100, rotate: 0 }}
								whileInView={{ opacity: 1, y: 0, rotate: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.7 }}
							/>
							<motion.img
								src={PrintingKids}
								alt="Studenten techniek"
								className="startpagina-uitleg-img startpagina-uitleg-img-right"
								initial={{ opacity: 0, y: -100, rotate: 20 }}
								whileInView={{ opacity: 1, y: 0, rotate: 20 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.9 }}
							/>
						</motion.div>
					</motion.section>

					{/* Banner */}
					<div className="startpagina-banner-container">
						<motion.div
							className="startpagina-banner"
							animate={{
								x: [0, -1000]
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
								repeatType: "loop"
							}}
						>
							Ontdek je persoonlijkheidstype • Vind jouw studierichting • Doe de
							test nu • Ontdek je persoonlijkheidstype • Vind jouw
							studierichting • Doe de test nu
						</motion.div>
					</div>

					{/* Test sectie */}
					<motion.section
						className="startpagina-test-uitleg"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<motion.div
							className="startpagina-test-uitleg-links"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h3>
								Doe de test en ontdek <br />
								welke studierichtingen en <br />
								beroepen bij jou passen.
							</h3>
							<button className="startpagina-btn startpagina-btn-primary">
								Start test
							</button>
						</motion.div>
						<motion.div
							className="startpagina-test-uitleg-rechts"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<p>
								De test toont jou de drie persoonlijkheidstypes die het best bij
								jou passen. Op basis daarvan krijg je gerichte aanbevelingen
								voor studierichtingen die aansluiten bij jouw profiel. Daarnaast
								ontdek je welke beroepen het beste matchen met jouw unieke
								persoonlijkheid.
							</p>
						</motion.div>
					</motion.section>

					{/* Wetenschap sectie */}
					<motion.section
						className="startpagina-wetenschap"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<motion.div
							className="startpagina-wetenschap-links"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h3>
								De <span className="startpagina-highlight">wetenschap</span>{" "}
								<br />
								achter de test?
							</h3>
							<p>
								We baseren ons op het RIASEC-model van John Holland, een bewezen
								en wetenschappelijk onderbouwde theorie uit de
								beroepspsychologie. Het model wordt al tientallen jaren gebruikt
								om mensen te helpen bij het vinden van een studierichting of
								carrière die echt bij hen past.
							</p>
						</motion.div>
						<div className="startpagina-wetenschap-rechts">
							<img
								src={johnHolland}
								alt="Psycholoog John Holland"
								className="startpagina-wetenschap-img"
							/>
						</div>
					</motion.section>

					{/* Banner onderaan */}
					<div className="startpagina-banner-container startpagina-banner-container-bottom">
						<motion.div
							className="startpagina-banner"
							animate={{
								x: [0, -1000]
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
								repeatType: "loop"
							}}
						>
							Ontdek je persoonlijkheidstype • Vind jouw studierichting • Doe de
							test nu • Ontdek je persoonlijkheidstype • Vind jouw
							studierichting • Doe de test nu
						</motion.div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Startpagina;
