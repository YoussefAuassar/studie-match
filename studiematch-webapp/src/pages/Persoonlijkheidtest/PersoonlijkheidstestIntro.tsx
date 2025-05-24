import "../../style/Persoonlijkheidtest/Persoonlijkheidstestintro.css";
import Navigatie from "../../components/Navigatie";
import infoIcon from "../../assets/info-more.svg";

const PersoonlijkheidstestIntro: React.FC = () => {
	return (
		<>
			<Navigatie />
			<div className="persoonlijkheidstest-intro-container">
				<h1>Start jouw studiematch!</h1>
				<h1>
					Kies je graad en krijg studierichtingen die <br />
					perfect bij jou passen
				</h1>
				<div className="persoonlijkheidstest-intro-button-group">
					<button>1ste Graad</button>
					<button>2de Graad</button>
					<button>3de Graad</button>
				</div>
				<div className="persoonlijkheidstest-intro-info-container">
					<img
						src={infoIcon}
						alt="Meer informatie"
						className="persoonlijkheidstest-intro-info-icon"
					/>
					<span className="persoonlijkheidstest-intro-tooltip">
						<strong>Selecteer de graad</strong> waarin jij van plan bent te
						studeren of waarin je momenteel zit. Op basis van jouw keuze tonen
						we
						<strong> enkel studierichtingen</strong> die aansluiten bij
						<strong> jouw graad</strong>, zodat je
						<strong> relevante en persoonlijke aanbevelingen</strong> krijgt.
					</span>
				</div>
			</div>
		</>
	);
};

export default PersoonlijkheidstestIntro;
