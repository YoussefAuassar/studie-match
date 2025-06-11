// import React, { useState, useEffect } from "react";
// import BeroepenCarousel from "../components/BeroepenCarousel";
// import { type Beroep, fetchBeroepen } from "../services/supabaseService";

// const BeroepenVoorbeeld: React.FC = () => {
// 	const [beroepen, setBeroepen] = useState<Beroep[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		async function loadData() {
// 			try {
// 				setLoading(true);
// 				const data = await fetchBeroepen();
// 				setBeroepen(data);
// 			} catch (err) {
// 				console.error("Error fetching data:", err);
// 				if (err instanceof Error) {
// 					setError(err.message);
// 				} else {
// 					setError("An unknown error occurred");
// 				}
// 			} finally {
// 				setLoading(false);
// 			}
// 		}

// 		loadData();
// 	}, []);

// 	if (loading) {
// 		return (
// 			<div style={{ padding: "2rem" }}>
// 				<h1>Ontdek beroepen</h1>
// 				<p>Loading beroepen data...</p>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div style={{ padding: "2rem" }}>
// 				<h1>Ontdek beroepen</h1>
// 				<p>Error: {error}</p>
// 			</div>
// 		);
// 	}

// 	console.log("Rendering with beroepen:", beroepen);

// 	return (
// 		<div style={{ padding: "2rem 0" }}>
// 			<h1 style={{ marginLeft: "2rem", marginBottom: "1.5rem" }}></h1>
// 			{beroepen.length === 0 ? (
// 				<p style={{ marginLeft: "2rem" }}>Geen beroepen gevonden.</p>
// 			) : (
// 				<BeroepenCarousel beroepen={beroepen} />
// 			)}
// 		</div>
// 	);
// };

// export default BeroepenVoorbeeld;
