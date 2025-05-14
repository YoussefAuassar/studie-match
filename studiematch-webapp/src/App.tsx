import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startpagina from "./pages/Home/Startpagina";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Startpagina />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
