import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startpagina from "./pages/Home/Startpagina";
import PersoonlijkheidstypesOverzicht from "./pages/Info/PersoonlijkheidstypesOverzicht";
import Artistiek from "./pages/Persoonlijkheidtypes/Artistiek";
import Persoonlijkheidstest from "./pages/Persoonlijkheidtest/Persoonlijkheidstest";
import TestResultaten from "./pages/Persoonlijkheidtest/TestResultaten";
import PersoonlijkheidstestIntro from "./pages/Persoonlijkheidtest/PersoonlijkheidstestIntro";
import StudierichtingenVoorbeeld from "./pages/StudierichtingenVoorbeeld";
import BeroepenVoorbeeld from "./pages/BeroepenVoorbeeld";

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
				<Route
					path="/persoonlijkheidstest"
					element={<Persoonlijkheidstest />}
				/>
				<Route path="/testresultaten" element={<TestResultaten />} />
				<Route
					path="/persoonlijkheidstestintro"
					element={<PersoonlijkheidstestIntro />}
				/>
				<Route
					path="/studierichtingen"
					element={<StudierichtingenVoorbeeld />}
				/>
				<Route path="/beroepen" element={<BeroepenVoorbeeld />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
