import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client setup
const supabaseUrl = "https://rnbacoepwqlkysgiqwuo.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuYmFjb2Vwd3Fsa3lzZ2lxd3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzkyNzMsImV4cCI6MjA2MzM1NTI3M30.kbL9H4svdF3kVxcXscETaVZnxfxMlz53bByUN_4h24I";
const supabase = createClient(supabaseUrl, supabaseKey);

// Define interface for our study direction data
interface Studierichting {
	id: number;
	naam_richting: string;
	afbeelding: string;
	beschrijving_richting: string;
	graad: number;
	jaren: number[];
	studiedomein: string | null;
	finaliteit: string | null;
	persoonlijkheidstype: string[];
	stroom: string | null;
}

function StudierichtingenOverzicht() {
	const [studierichtingen, setStudierichtingen] = useState<Studierichting[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchStudierichtingen() {
			try {
				setLoading(true);

				// Fetch data from Supabase
				const { data, error } = await supabase
					.from("studierichtingen")
					.select("*");

				if (error) {
					throw error;
				}

				if (data) {
					setStudierichtingen(data);
				}
			} catch (err) {
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

	// Helper function to get the full image URL
	const getImageUrl = (imagePath: string) => {
		// Check if the image path is already a full URL
		if (imagePath.startsWith("http")) {
			return imagePath;
		}

		// Otherwise construct the Supabase storage URL
		return `${supabaseUrl}/storage/v1/object/public/studierichtingen/afbeeldingen/${imagePath}`;
	};

	if (loading) {
		return <div>Loading studierichtingen data...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div style={{ padding: "20px" }}>
			<h1>Studierichtingen Overzicht</h1>

			{studierichtingen.length === 0 ? (
				<p>Geen studierichtingen gevonden.</p>
			) : (
				<div>
					<p>Aantal studierichtingen: {studierichtingen.length}</p>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
							gap: "20px"
						}}
					>
						{studierichtingen.map((richting) => (
							<div
								key={richting.id}
								style={{
									border: "1px solid #ccc",
									borderRadius: "8px",
									padding: "16px"
								}}
							>
								<h2>{richting.naam_richting || "Geen naam"}</h2>
								{richting.afbeelding && (
									<img
										src={getImageUrl(richting.afbeelding)}
										alt={richting.naam_richting}
										style={{ maxWidth: "100%", height: "auto" }}
									/>
								)}
								<p>Graad: {richting.graad}</p>
								<p>Jaren: {richting.jaren?.join(", ")}</p>
								{richting.persoonlijkheidstype && (
									<p>
										Persoonlijkheidstype:{" "}
										{richting.persoonlijkheidstype.join(", ")}
									</p>
								)}
								<div>
									<h3>Beschrijving:</h3>
									<p>{richting.beschrijving_richting}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default StudierichtingenOverzicht;
