import "../../Style/Info/Overons.css";
import Navigatie from "../../components/Navigatie";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import conventioneel from "../../assets/conventioneel-type.png";
import denken from "../../assets/denken.png";

const OverOns = () => {
	return (
		<div className="over-ons-page-container">
			<Navigatie />
			<div className="over-ons">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Over Studie Match
				</motion.h1>

				<div className="over-ons-missie-container">
					{" "}
					<motion.div
						className="over-ons-karakter"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<img
							src={conventioneel}
							alt="Conventioneel type"
							className="karakter-afbeelding"
						/>
					</motion.div>
					<motion.div
						className="over-ons-missie"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<h2>Onze Missie</h2>
						<p>
							StudieMatch is ontstaan vanuit een duidelijke missie: het
							begeleiden van leerlingen in het secundair onderwijs bij het maken
							van de juiste studiekeuze. We begrijpen dat deze keuze een grote
							impact heeft op je toekomst en soms overweldigend kan zijn.Door
							middel van onze wetenschappelijk onderbouwde persoonlijkheidstest,
							gebaseerd op de theorie van John Holland, helpen we je om inzicht
							te krijgen in wie je bent en welke studierichtingen het beste bij
							jou passen.
						</p>
					</motion.div>
				</div>

				<div className="over-ons-banner-container">
					<motion.div
						className="over-ons-banner"
						animate={{
							x: ["10%", "-60%"]
						}}
						transition={{
							duration: 60,
							repeat: Infinity,
							ease: "linear",
							repeatType: "loop"
						}}
					>
						Ontdek je persoonlijkheidstype • Vind jouw studierichting • Doe de
						test nu • Ontdek je persoonlijkheidstype • Vind jouw studierichting
						• Doe de test nu • Ontdek je persoonlijkheidstype • Vind jouw
						studierichting • Doe de test nu • Ontdek je persoonlijkheidstype •
						Vind jouw studierichting • Doe de test nu • Ontdek je
						persoonlijkheidstype • Vind jouw studierichting
					</motion.div>
				</div>

				<motion.div
					className="over-ons-aanpak"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<div className="aanpak-content">
						<h2>Onze Aanpak</h2>
						<p>
							We combineren moderne technologie met een wetenschappelijk
							onderbouwde test. De persoonlijkheidstest is ontworpen om zes
							types in kaart te brengen: Realistisch, Onderzoekend, Artistiek,
							Sociaal, Ondernemend en Conventioneel. Na het invullen van de test
							ontdek je jouw drie sterkste types. Op basis daarvan krijg je
							gerichte aanbevelingen voor studierichtingen én beroepen die
							passen bij jouw interesses, talenten en persoonlijkheid. Zo helpen
							we je om een richting te kiezen die echt bij je past.
						</p>
					</div>
				</motion.div>

				<div className="na-de-test-container">
					<motion.div
						className="na-de-test"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<h2>Wat na de test?</h2>
						<p>
							Je krijgt na de test meteen een duidelijk overzicht van welke
							studierichtingen bij jou passen. Je kan je resultaten ook
							downloaden als PDF. Zo kan je ze makkelijk meenemen of delen met
							je studiebegeleider, leerkracht of iemand van het CLB.
						</p>
						<p>
							Samen naar je resultaten kijken helpt om nog meer inzicht te
							krijgen in wat écht bij jou past. Zij kunnen je extra uitleg geven
							of hun mening delen, zodat je sterker staat in je studiekeuze.
						</p>
					</motion.div>
					<motion.div
						className="over-ons-karakter"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<img src={denken} alt="Denken" className="karakter-afbeelding" />
					</motion.div>
				</div>
			</div>
			{/* Bottom Banner */}
			<div className="over-ons-banner-container over-ons-banner-container-bottom">
				<motion.div
					className="over-ons-banner"
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
					test nu • Ontdek je persoonlijkheidstype • Vind jouw studierichting •
					Doe de test nu
				</motion.div>
			</div>
			<Footer />
		</div>
	);
};

export default OverOns;
