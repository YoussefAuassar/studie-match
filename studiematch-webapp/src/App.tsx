import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startpagina from "./pages/Home/Startpagina";
import PersoonlijkheidstypesOverzicht from "./pages/Info/PersoonlijkheidstypesOverzicht";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Startpagina />} />
				<Route
					path="/persoonlijkheidstypes"
					element={<PersoonlijkheidstypesOverzicht />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
