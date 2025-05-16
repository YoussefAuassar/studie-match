import "../../style/Home/Persoonlijkheidstypesoverzicht.css";
import artistiek from "../../assets/artistiek-type.png";
import sociaal from "../../assets/sociaal-type.png";
import ondernemend from "../../assets/ondernemend-type.png";
const PersoonlijkheidstypesOverzicht = () => {
	return (
		<div className="persoonlijkheidstypes-overzicht">
			<div className="squares-grid">
				<div className="square" style={{ backgroundColor: "#A883CA" }}>
					<img src={artistiek} alt="artistiek type" />
					<h1 className="square-text">Artistiek</h1>
				</div>
				<div className="square" style={{ backgroundColor: "#48A6BB" }}>
					<img src="/path-to-your-image2.jpg" alt="" />
					<h1 className="square-text">Realistisch</h1>
				</div>
				<div className="square" style={{ backgroundColor: "#FF6366" }}>
					<img src={ondernemend} alt="ondernemend type" />
					<h1 className="square-text">Ondernemend</h1>
				</div>
				<div className="square" style={{ backgroundColor: "#87CA83" }}>
					<img src={sociaal} alt="artistiek type" />
					<h1 className="square-text">Sociaal</h1>
				</div>
				<div className="square" style={{ backgroundColor: "#5C4E9B" }}>
					<img src="/path-to-your-image5.jpg" alt="" />
					<h1 className="square-text">Onderzoeker</h1>
				</div>
				<div className="square" style={{ backgroundColor: "#009298" }}>
					<img src="/path-to-your-image6.jpg" alt="" />
					<h1 className="square-text">Conventioneel</h1>
				</div>
			</div>
		</div>
	);
};

export default PersoonlijkheidstypesOverzicht;
