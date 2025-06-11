import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startpagina from "./pages/Home/Startpagina";
import PersoonlijkheidstypesOverzicht from "./pages/Info/PersoonlijkheidstypesOverzicht";
import Artistiek from "./pages/Persoonlijkheidtypes/Artistiek";
import Conventioneel from "./pages/Persoonlijkheidtypes/Conventioneel";
import Sociaal from "./pages/Persoonlijkheidtypes/Sociaal";
import Ondernemend from "./pages/Persoonlijkheidtypes/Ondernemend";
import Realistisch from "./pages/Persoonlijkheidtypes/Realistisch";
import Onderzoeker from "./pages/Persoonlijkheidtypes/Onderzoeker";
import Persoonlijkheidstest from "./pages/Persoonlijkheidtest/Persoonlijkheidstest";
import TestResultaten from "./pages/Persoonlijkheidtest/TestResultaten";
import PersoonlijkheidstestIntro from "./pages/Persoonlijkheidtest/PersoonlijkheidstestIntro";
import TweedeGraad from "./pages/Persoonlijkheidtest/TweedeGraad";
import DerdeGraad from "./pages/Persoonlijkheidtest/DerdeGraad";
// import StudierichtingenVoorbeeld from "./pages/StudierichtingenVoorbeeld";
// import BeroepenVoorbeeld from "./pages/BeroepenVoorbeeld";
import BeroepDetail from "./pages/Detail/BeroepDetail";
import StudierichtingDetail from "./pages/Detail/StudierichtingDetail";
import FilterStudierichtingen from "./pages/Info/FilterStudierichtingen";
import OverOns from "./pages/Info/OverOns";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Startpagina />} />
				<Route
					path="/persoonlijkheidstypes"
					element={<PersoonlijkheidstypesOverzicht />}
				/>
				<Route path="/artistiek" element={<Artistiek />} />
				<Route path="/conventioneel" element={<Conventioneel />} />
				<Route path="/sociaal" element={<Sociaal />} />
				<Route path="/ondernemend" element={<Ondernemend />} />
				<Route path="/realistisch" element={<Realistisch />} />
				<Route path="/onderzoeker" element={<Onderzoeker />} />
				<Route
					path="/persoonlijkheidstest"
					element={<Persoonlijkheidstest />}
				/>
				<Route path="/testresultaten" element={<TestResultaten />} />
				<Route
					path="/persoonlijkheidstestintro"
					element={<PersoonlijkheidstestIntro />}
				/>
				<Route path="/tweede-graad" element={<TweedeGraad />} />
				<Route path="/derde-graad" element={<DerdeGraad />} />
				{/* <Route
					path="/studierichtingen"
					element={<StudierichtingenVoorbeeld />}
				/>
				<Route path="/beroepen" element={<BeroepenVoorbeeld />} /> */}
				<Route path="/beroep/:id" element={<BeroepDetail />} />
				<Route path="/studierichting/:id" element={<StudierichtingDetail />} />
				<Route
					path="/filter-studierichtingen"
					element={<FilterStudierichtingen />}
				/>
				<Route path="/over-ons" element={<OverOns />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
