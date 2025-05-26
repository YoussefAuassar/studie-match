import "../../style/Persoonlijkheidtest/Persoonlijkheidstestintro.css";
import Navigatie from "../../components/Navigatie";
import infoIcon from "../../assets/info-more.svg";
import { useNavigate } from "react-router-dom";

const DerdeGraad: React.FC = () => {
	const navigate = useNavigate();

	const handleStartTest = (jaar: number) => {
		navigate("/persoonlijkheidstest", { state: { graad: 3, jaar: jaar } });
	};

	return (
		<>
			<Navigatie />
			<div className="persoonlijkheidstest-intro-container">
				<h1>Start jouw studiematch!</h1>
				<h1>
					Kies je jaar en krijg studierichtingen die <br />
					perfect bij jou passen
				</h1>
				<div className="persoonlijkheidstest-intro-button-group">
					<button onClick={() => handleStartTest(5)}>5de Jaar</button>
					<button onClick={() => handleStartTest(6)}>6de Jaar</button>
				</div>
				<div className="persoonlijkheidstest-intro-info-container">
					<img
						src={infoIcon}
						alt="Meer informatie"
						className="persoonlijkheidstest-intro-info-icon"
					/>
					<span className="persoonlijkheidstest-intro-tooltip">
						<strong>Selecteer het jaar</strong> waarin jij van plan bent te
						studeren of waarin je momenteel zit. Op basis van jouw keuze tonen
						we
						<strong> enkel studierichtingen</strong> die aansluiten bij
						<strong> jouw jaar</strong>, zodat je
						<strong> relevante en persoonlijke aanbevelingen</strong> krijgt.
					</span>
				</div>
			</div>
		</>
	);
};

export default DerdeGraad;
