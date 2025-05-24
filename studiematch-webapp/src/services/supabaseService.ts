import { createClient, PostgrestError } from "@supabase/supabase-js";

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

export async function fetchStudierichtingen(): Promise<{
	data: Studierichting[] | null;
	error: PostgrestError | null;
}> {
	const { data, error } = await supabase.from("studierichtingen").select("*");

	return { data, error };
}

export async function fetchBeroepen(): Promise<{
	data: Beroep[] | null;
	error: PostgrestError | null;
}> {
	const { data, error } = await supabase.from("beroepen").select("*");
	return { data, error };
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
