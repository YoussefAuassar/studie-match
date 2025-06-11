// import React, { useState, useEffect } from "react";
// import StudierichtingenCarousel from "../components/StudierichtingenCarousel";
// import {
// 	type Studierichting,
// 	fetchStudierichtingen
// } from "../services/supabaseService";

// const StudierichtingenVoorbeeld: React.FC = () => {
// 	const [studierichtingen, setStudierichtingen] = useState<Studierichting[]>(
// 		[]
// 	);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		async function loadData() {
// 			try {
// 				setLoading(true);
// 				const data = await fetchStudierichtingen();
// 				setStudierichtingen(data);
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
// 				<h1>Ontdek studierichtingen</h1>
// 				<p>Loading studierichtingen data...</p>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div style={{ padding: "2rem" }}>
// 				<h1>Ontdek studierichtingen</h1>
// 				<p>Error: {error}</p>
// 			</div>
// 		);
// 	}

// 	console.log("Rendering with studierichtingen:", studierichtingen);

// 	return (
// 		<div style={{ padding: "2rem 0" }}>
// 			<h1 style={{ marginLeft: "2rem", marginBottom: "1.5rem" }}></h1>
// 			{studierichtingen.length === 0 ? (
// 				<p style={{ marginLeft: "2rem" }}>Geen studierichtingen gevonden.</p>
// 			) : (
// 				<StudierichtingenCarousel studierichtingen={studierichtingen} />
// 			)}
// 		</div>
// 	);
// };

// export default StudierichtingenVoorbeeld;
