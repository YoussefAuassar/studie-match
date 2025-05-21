import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import StudierichtingenCarousel from "../components/StudierichtingenCarousel";
import type { StudierichtingProps } from "../components/StudierichtingenCarousel";

const supabaseUrl = "https://rnbacoepwqlkysgiqwuo.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuYmFjb2Vwd3Fsa3lzZ2lxd3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzkyNzMsImV4cCI6MjA2MzM1NTI3M30.kbL9H4svdF3kVxcXscETaVZnxfxMlz53bByUN_4h24I";
const supabase = createClient(supabaseUrl, supabaseKey);

const StudierichtingenVoorbeeld: React.FC = () => {
	const [studierichtingen, setStudierichtingen] = useState<
		StudierichtingProps[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchStudierichtingen() {
			try {
				setLoading(true);

				const { data, error } = await supabase
					.from("studierichtingen")
					.select("*");

				if (error) {
					throw error;
				}

				if (data) {
					console.log("Fetched data:", data);
					setStudierichtingen(data);
				}
			} catch (err) {
				console.error("Error fetching data:", err);
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		}

		fetchStudierichtingen();
	}, []);

	const getImageUrl = (imagePath: string) => {
		if (!imagePath) {
			console.warn("Empty image path provided");
			return "";
		}

		if (imagePath.startsWith("http")) {
			return imagePath;
		}

		const fullUrl = `${supabaseUrl}/storage/v1/object/public/studierichtingen/afbeeldingen/${imagePath}`;
		console.log("Image URL:", fullUrl);
		return fullUrl;
	};

	if (loading) {
		return (
			<div style={{ padding: "2rem" }}>
				<h1>Ontdek studierichtingen</h1>
				<p>Loading studierichtingen data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: "2rem" }}>
				<h1>Ontdek studierichtingen</h1>
				<p>Error: {error}</p>
			</div>
		);
	}

	console.log("Rendering with studierichtingen:", studierichtingen);

	return (
		<div style={{ padding: "2rem 0" }}>
			<h1 style={{ marginLeft: "2rem", marginBottom: "1.5rem" }}></h1>
			{studierichtingen.length === 0 ? (
				<p style={{ marginLeft: "2rem" }}>Geen studierichtingen gevonden.</p>
			) : (
				<StudierichtingenCarousel
					studierichtingen={studierichtingen}
					getImageUrl={getImageUrl}
				/>
			)}
		</div>
	);
};

export default StudierichtingenVoorbeeld;
