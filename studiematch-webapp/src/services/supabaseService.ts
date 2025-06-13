import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rnbacoepwqlkysgiqwuo.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuYmFjb2Vwd3Fsa3lzZ2lxd3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzkyNzMsImV4cCI6MjA2MzM1NTI3M30.kbL9H4svdF3kVxcXscETaVZnxfxMlz53bByUN_4h24I";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Studierichting {
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

export interface Beroep {
	id: number;
	naam_beroep: string;
	afbeelding: string;
	beschrijving_beroep: string;
	persoonlijkheidstype: string[];
}

export async function fetchStudierichtingen(
	graad?: number,
	jaar?: number,
	persoonlijkheidstypes?: string[]
): Promise<Studierichting[]> {
	try {
		let query = supabase.from("studierichtingen").select("*");

		if (graad !== undefined) {
			query = query.eq("graad", graad);
		}

		if (jaar !== undefined) {
			query = query.contains("jaren", [jaar]);
		}

		const { data, error } = await query;

		if (error) {
			console.error("Error fetching studierichtingen:", error);
			return [];
		}

		if (!data) {
			return [];
		}

		let filteredData = data;
		if (persoonlijkheidstypes && persoonlijkheidstypes.length > 0) {
			filteredData = data.filter((richting) =>
				richting.persoonlijkheidstype.some((type: string) =>
					persoonlijkheidstypes.includes(type)
				)
			);
		}

		if (jaar !== undefined) {
			filteredData = filteredData.filter((richting) =>
				richting.jaren.includes(jaar)
			);
		}

		return filteredData;
	} catch (error) {
		console.error("Error in fetchStudierichtingen:", error);
		return [];
	}
}

export async function fetchBeroepen(
	persoonlijkheidstypes?: string[]
): Promise<Beroep[]> {
	try {
		const { data, error } = await supabase.from("beroepen").select("*");

		if (error) {
			console.error("Error fetching beroepen:", error);
			return [];
		}

		if (!data) {
			return [];
		}

		if (persoonlijkheidstypes && persoonlijkheidstypes.length > 0) {
			return data.filter((beroep) =>
				beroep.persoonlijkheidstype.some((type: string) =>
					persoonlijkheidstypes.includes(type)
				)
			);
		}

		return data;
	} catch (error) {
		console.error("Error in fetchBeroepen:", error);
		return [];
	}
}

export function getImageUrl(
	imagePath: string,
	type: "studierichtingen" | "beroepen" = "studierichtingen"
): string {
	if (imagePath.startsWith("http")) {
		return imagePath;
	}

	return `${supabaseUrl}/storage/v1/object/public/${type}/afbeeldingen/${imagePath}`;
}
