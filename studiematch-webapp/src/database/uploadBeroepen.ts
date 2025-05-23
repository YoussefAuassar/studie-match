import { createClient } from "@supabase/supabase-js";
import beroepen from "./beroepenData";

const supabaseUrl = "https://rnbacoepwqlkysgiqwuo.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuYmFjb2Vwd3Fsa3lzZ2lxd3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzkyNzMsImV4cCI6MjA2MzM1NTI3M30.kbL9H4svdF3kVxcXscETaVZnxfxMlz53bByUN_4h24I";

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadBeroepen() {
	console.log("Starting upload of beroepen data...");

	try {
		const { error } = await supabase.from("beroepen").insert(beroepen);

		if (error) {
			console.error("Error uploading data:", error);
			return;
		}

		console.log("Data uploaded successfully!");
		console.log(`Uploaded ${beroepen.length} records.`);
	} catch (e) {
		console.error("Unexpected error:", e);
	}
}

uploadBeroepen();
