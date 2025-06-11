import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { type Studierichting } from "../services/supabaseService";
import logoImage from "../assets/logo-image.png";

interface PersonalityType {
	name: string;
	percentage: number;
	className: string;
}

interface TestResultsPDFProps {
	results: PersonalityType[];
	studierichtingen: Studierichting[];
	graad?: number;
	jaar?: number;
}

type ColorTuple = [number, number, number];

const COLORS: Record<string, ColorTuple> = {
	primary: [72, 166, 187],
	white: [255, 255, 255],
	black: [0, 0, 0],
	gray: [100, 100, 100],
	lightGray: [128, 128, 128],
	background: [244, 245, 249]
};

const PERSONALITY_COLORS: Record<string, ColorTuple> = {
	Artistiek: [168, 131, 202],
	Sociaal: [135, 202, 131],
	Ondernemend: [255, 99, 102],
	Onderzoeker: [92, 78, 155],
	Conventioneel: [0, 146, 152],
	Realistisch: [72, 166, 187]
};

const PDF_CONFIG = {
	headerHeight: 50,
	margin: {
		side: 20,
		box: 8
	},
	boxHeight: 38,
	typeBox: {
		width: 28,
		height: 8,
		spacing: 2,
		padding: 6
	},
	fontSize: {
		header: 24,
		title: 18,
		subtitle: 14,
		percentage: 20,
		content: 11,
		small: 8,
		typeLabel: 7.5
	}
} as const;

const TestResultsPDF: React.FC<TestResultsPDFProps> = ({
	results,
	studierichtingen,
	graad,
	jaar
}) => {
	const [error, setError] = useState<string | null>(null);
	const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

	const prepareLogo = async () => {
		try {
			const img = new Image();
			img.src = logoImage;

			await new Promise<void>((resolve) => {
				img.onload = () => {
					const canvas = document.createElement("canvas");
					const scale = 2;
					canvas.width = img.width * scale;
					canvas.height = img.height * scale;

					const ctx = canvas.getContext("2d");
					if (!ctx) return;

					ctx.scale(scale, scale);
					ctx.fillStyle = "white";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0);

					setLogoDataUrl(canvas.toDataURL("image/png"));
					resolve();
				};
			});
		} catch {
			setError("Error preparing logo for PDF");
		}
	};

	useEffect(() => {
		prepareLogo();
	}, []);

	const createFirstPage = (doc: jsPDF) => {
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();

		doc.setFillColor(...COLORS.primary);
		doc.rect(0, 0, pageWidth, pageHeight, "F");

		const logoWidth = 80;
		const logoHeight = logoWidth * 0.5;
		const logoX = (pageWidth - logoWidth) / 2;
		const logoY = (pageHeight - logoHeight) / 2;

		doc.addImage(logoImage, "PNG", logoX, logoY, logoWidth, logoHeight);
	};

	const createHeader = (doc: jsPDF, pageWidth: number) => {
		doc.setFillColor(...COLORS.primary);
		doc.rect(0, 0, pageWidth, PDF_CONFIG.headerHeight, "F");

		doc.setFontSize(PDF_CONFIG.fontSize.header);
		doc.setFont("helvetica", "bold");
		doc.setTextColor(...COLORS.white);
		doc.text("Persoonlijkheidstest Resultaten", pageWidth / 2, 30, {
			align: "center"
		});
	};

	const renderPersonalityTypes = (
		doc: jsPDF,
		pageWidth: number,
		sortedTypes: PersonalityType[]
	) => {
		const [topThreeTypes, remainingTypes] = [
			sortedTypes.slice(0, 3),
			sortedTypes.slice(3)
		];
		let contentY = 65;
		const boxWidth = (pageWidth - 2 * PDF_CONFIG.margin.side) / 3;

		topThreeTypes.forEach((type, index) => {
			const boxX = PDF_CONFIG.margin.side + boxWidth * index;
			const typeColor = PERSONALITY_COLORS[type.name] || COLORS.black;

			doc.setFillColor(...typeColor);
			doc.rect(boxX, contentY, boxWidth - 5, 40, "F");

			doc.setFontSize(PDF_CONFIG.fontSize.subtitle);
			doc.setFont("helvetica", "bold");
			doc.setTextColor(...COLORS.white);

			const centerX = boxX + (boxWidth - 5) / 2;
			doc.text(type.name, centerX, contentY + 15, { align: "center" });
			doc.setFontSize(PDF_CONFIG.fontSize.percentage);
			doc.text(`${type.percentage}%`, centerX, contentY + 35, {
				align: "center"
			});
		});

		contentY += 45;

		if (remainingTypes.length > 0) {
			doc.setFontSize(PDF_CONFIG.fontSize.subtitle);
			doc.setFont("helvetica", "normal");
			doc.setTextColor(...COLORS.black);
			remainingTypes.forEach((type) => {
				doc.text(
					`${type.name}: ${type.percentage}%`,
					PDF_CONFIG.margin.side,
					contentY
				);
				contentY += 10;
			});
		}

		return contentY + 20;
	};

	const renderStudyDirections = (
		doc: jsPDF,
		pageWidth: number,
		startY: number,
		studyDirections: Studierichting[]
	) => {
		doc.setFontSize(PDF_CONFIG.fontSize.title);
		doc.setTextColor(...COLORS.black);
		doc.setFont("helvetica", "bold");

		const title = "Studierichtingen voor jou";
		doc.text(title, PDF_CONFIG.margin.side, startY);

		const boldTextWidth = doc.getTextWidth(title);
		doc.setFont("helvetica", "normal");
		doc.text(
			` | ${jaar}e jaar - ${graad}e graad`,
			PDF_CONFIG.margin.side + boldTextWidth,
			startY
		);

		const studyItemsPerRow = 2;
		const studyBoxWidth =
			(pageWidth - 2 * PDF_CONFIG.margin.side - PDF_CONFIG.margin.box) /
			studyItemsPerRow;
		let currentY = startY + 10;

		const renderStudyBox = (richting: Studierichting, x: number, y: number) => {
			doc.setFillColor(...COLORS.background);
			doc.rect(x, y, studyBoxWidth, PDF_CONFIG.boxHeight, "F");

			if (richting.persoonlijkheidstype?.length) {
				let typeX = x + PDF_CONFIG.typeBox.padding;
				richting.persoonlijkheidstype.forEach((type) => {
					const typeColor = PERSONALITY_COLORS[type] || COLORS.black;
					doc.setFillColor(...typeColor);
					doc.rect(
						typeX,
						y + PDF_CONFIG.typeBox.padding,
						PDF_CONFIG.typeBox.width,
						PDF_CONFIG.typeBox.height,
						"F"
					);

					doc.setFontSize(PDF_CONFIG.fontSize.typeLabel);
					doc.setTextColor(...COLORS.white);
					doc.text(
						type,
						typeX + PDF_CONFIG.typeBox.width / 2,
						y + PDF_CONFIG.typeBox.padding + 5.5,
						{
							align: "center"
						}
					);

					typeX += PDF_CONFIG.typeBox.width + PDF_CONFIG.typeBox.spacing;
				});
			}

			const textX = x + PDF_CONFIG.typeBox.padding;
			const textY = richting.persoonlijkheidstype?.length ? y + 20 : y + 14;

			doc.setFontSize(PDF_CONFIG.fontSize.content);
			doc.setTextColor(...COLORS.black);
			const lines = doc.splitTextToSize(
				richting.naam_richting,
				studyBoxWidth - 12
			);
			lines.forEach((line: string, lineIndex: number) => {
				doc.text(line, textX, textY + lineIndex * 6);
			});

			if (richting.studiedomein || richting.finaliteit) {
				doc.setFontSize(PDF_CONFIG.fontSize.small);
				doc.setTextColor(...COLORS.gray);
				const infoY = textY + lines.length * 6 + 2;
				const halfWidth = (studyBoxWidth - 12) / 2;

				if (richting.studiedomein) {
					const domeinLines = doc.splitTextToSize(
						richting.studiedomein,
						halfWidth
					);
					domeinLines.forEach((line: string, lineIndex: number) => {
						doc.text(line, textX, infoY + lineIndex * 8);
					});
				}

				doc.text("|", x + studyBoxWidth / 2, infoY);

				if (richting.finaliteit) {
					const finaliteitX = x + studyBoxWidth / 2 + 4;
					const finaliteitLines = doc.splitTextToSize(
						richting.finaliteit,
						halfWidth
					);
					finaliteitLines.forEach((line: string, lineIndex: number) => {
						doc.text(line, finaliteitX, infoY + lineIndex * 8);
					});
				}
			}
		};

		studyDirections.forEach((richting, index) => {
			const col = index % studyItemsPerRow;

			if (index < 6) {
				const row = Math.floor(index / studyItemsPerRow);
				const boxX =
					PDF_CONFIG.margin.side +
					col * (studyBoxWidth + PDF_CONFIG.margin.box);
				const boxY =
					currentY + row * (PDF_CONFIG.boxHeight + PDF_CONFIG.margin.box);
				renderStudyBox(richting, boxX, boxY);
			} else {
				const itemsAfterFirstPage = index - 6;
				if (itemsAfterFirstPage % 10 === 0) {
					doc.addPage();
					currentY = 40;
				}
				const row = Math.floor((itemsAfterFirstPage % 10) / studyItemsPerRow);
				const boxX =
					PDF_CONFIG.margin.side +
					col * (studyBoxWidth + PDF_CONFIG.margin.box);
				const boxY =
					currentY + row * (PDF_CONFIG.boxHeight + PDF_CONFIG.margin.box);
				renderStudyBox(richting, boxX, boxY);
			}
		});
	};

	const generatePDF = () => {
		try {
			if (!logoDataUrl) throw new Error("Logo not ready yet");

			const doc = new jsPDF();
			const pageWidth = doc.internal.pageSize.getWidth();

			createFirstPage(doc);
			doc.addPage();
			createHeader(doc, pageWidth);

			const sortedTypes = [...results].sort(
				(a, b) => b.percentage - a.percentage
			);
			const contentY = renderPersonalityTypes(doc, pageWidth, sortedTypes);
			renderStudyDirections(doc, pageWidth, contentY, studierichtingen);

			doc.setFontSize(PDF_CONFIG.fontSize.small);
			doc.setTextColor(...COLORS.lightGray);
			doc.text(
				`Gegenereerd op ${new Date().toLocaleDateString()}`,
				pageWidth - PDF_CONFIG.margin.side,
				doc.internal.pageSize.getHeight() - 10,
				{ align: "right" }
			);

			doc.save("studie-match-resultaten.pdf");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error generating PDF");
		}
	};

	return (
		<>
			<button className="download-results-button" onClick={generatePDF}>
				Download Resultaten
			</button>
			{error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
		</>
	);
};

export default TestResultsPDF;
