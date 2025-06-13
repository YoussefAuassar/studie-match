import React, { useState, useEffect } from "react";
import {
	type Studierichting,
	fetchStudierichtingen,
	getImageUrl
} from "../../services/supabaseService";
import { useNavigate } from "react-router-dom";
import Navigatie from "../../components/Navigatie";
import Footer from "../../components/Footer";
import "../../style/Info/Filterstudierichtingen.css";
import searchIcon from "../../assets/search-icon.svg";

interface FilterState {
	graad: number[];
	jaar: number[];
	studiedomein: string[];
	finaliteit: string[];
	persoonlijkheid: string[];
}

const FilterStudierichtingen: React.FC = () => {
	const navigate = useNavigate();
	const [studierichtingen, setStudierichtingen] = useState<Studierichting[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [openFilter, setOpenFilter] = useState<string | null>(null);
	const [visibleItems, setVisibleItems] = useState(8);
	const [searchPlaceholder, setSearchPlaceholder] = useState(
		"Zoek jouw studierichting in het secundair"
	);
	const [filters, setFilters] = useState<FilterState>({
		graad: [],
		jaar: [],
		studiedomein: [],
		finaliteit: [],
		persoonlijkheid: []
	});

	const filterOptions = {
		graad: [1, 2, 3],
		jaar: [1, 2, 3, 4, 5, 6],
		studiedomein: [
			"Domeinoverschrijdend",
			"Economie en organisatie",
			"Kunst en creatie",
			"Land- en tuinbouw",
			"Maatschappij en welzijn",
			"Sport",
			"STEM",
			"Taal en cultuur",
			"Voeding en horeca"
		],
		finaliteit: ["Doorstroom", "Dubbele", "Arbeidsmarkt"],
		persoonlijkheid: [
			"Artistiek",
			"Sociaal",
			"Ondernemend",
			"Onderzoeker",
			"Conventioneel",
			"Realistisch"
		]
	};

	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true);
				const data = await fetchStudierichtingen();
				setStudierichtingen(data);
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

		loadData();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 480) {
				setSearchPlaceholder("Zoek jouw studierichting");
			} else {
				setSearchPlaceholder("Zoek jouw studierichting in het secundair");
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleFilterClick = (filterName: string) => {
		setOpenFilter(openFilter === filterName ? null : filterName);
	};

	const handleNumberFilterChange = (
		filterType: "graad" | "jaar",
		value: number
	) => {
		setFilters((prev) => {
			const currentValues = prev[filterType];
			const valueExists = currentValues.includes(value);

			return {
				...prev,
				[filterType]: valueExists
					? currentValues.filter((v) => v !== value)
					: [...currentValues, value]
			};
		});
	};

	const handleStringFilterChange = (
		filterType: "studiedomein" | "finaliteit" | "persoonlijkheid",
		value: string
	) => {
		setFilters((prev) => {
			const currentValues = prev[filterType];
			const valueExists = currentValues.includes(value);

			return {
				...prev,
				[filterType]: valueExists
					? currentValues.filter((v) => v !== value)
					: [...currentValues, value]
			};
		});
	};

	const handleStudierichtingClick = (id: number, jaar: number) => {
		navigate(`/studierichting/${id}?jaar=${jaar}`);
	};

	const loadMore = () => {
		setVisibleItems((prev) => prev + 16);
	};

	const filteredStudierichtingen = studierichtingen
		.filter((studierichting) => {
			if (searchQuery) {
				const searchLower = searchQuery.toLowerCase();
				return studierichting.naam_richting.toLowerCase().includes(searchLower);
			}
			return true;
		})
		.filter((studierichting) => {
			if (
				filters.graad.length > 0 &&
				!filters.graad.includes(studierichting.graad)
			) {
				return false;
			}
			if (
				filters.jaar.length > 0 &&
				!studierichting.jaren.some((jaar) => filters.jaar.includes(jaar))
			) {
				return false;
			}
			if (
				filters.studiedomein.length > 0 &&
				!filters.studiedomein.includes(studierichting.studiedomein || "")
			) {
				return false;
			}
			if (
				filters.finaliteit.length > 0 &&
				!filters.finaliteit.includes(studierichting.finaliteit || "")
			) {
				return false;
			}
			if (
				filters.persoonlijkheid.length > 0 &&
				!studierichting.persoonlijkheidstype.some((type) =>
					filters.persoonlijkheid.includes(type)
				)
			) {
				return false;
			}
			return true;
		})
		.flatMap((studierichting) => {
			if (filters.jaar.length > 0) {
				return filters.jaar
					.filter((jaar) => studierichting.jaren.includes(jaar))
					.map((jaar) => ({
						...studierichting,
						currentJaar: jaar
					}));
			}

			return studierichting.jaren.map((jaar) => ({
				...studierichting,
				currentJaar: jaar
			}));
		})
		.sort((a, b) => a.currentJaar - b.currentJaar);

	return (
		<div className="filter-studierichtingen-page-container">
			<Navigatie />
			<div className="filter-studierichtingen-container">
				<h1 className="studierichtingen-title-header">Alle studierichtingen</h1>
				<div className="search-and-filters-container">
					<div className="search-section">
						<div className="search-container">
							<input
								type="text"
								placeholder={searchPlaceholder}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="search-input"
							/>
							<div className="search-icon-container">
								<img src={searchIcon} alt="Search" width="28" height="28" />
							</div>
						</div>
					</div>

					<div className="filters-section">
						{Object.entries(filterOptions).map(([filterName, options]) => (
							<div
								key={filterName}
								className="filter-dropdown"
								data-filter={filterName}
							>
								<button
									className="filter-dropdown-button"
									onClick={() => handleFilterClick(filterName)}
								>
									{filterName.charAt(0).toUpperCase() + filterName.slice(1)}
									<svg
										className={`dropdown-arrow ${
											openFilter === filterName ? "open" : ""
										}`}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										width="24"
										height="24"
									>
										<path d="M7 10l5 5 5-5z" />
									</svg>
								</button>
								{openFilter === filterName && (
									<div className="filter-dropdown-content">
										{options.map((option) => (
											<label key={option} className="filter-checkbox-label">
												<input
													type="checkbox"
													checked={
														filterName === "graad" || filterName === "jaar"
															? filters[filterName].includes(Number(option))
															: filters[
																	filterName as
																		| "studiedomein"
																		| "finaliteit"
																		| "persoonlijkheid"
															  ].includes(String(option))
													}
													onChange={() => {
														if (
															filterName === "graad" ||
															filterName === "jaar"
														) {
															handleNumberFilterChange(
																filterName,
																Number(option)
															);
														} else {
															handleStringFilterChange(
																filterName as
																	| "studiedomein"
																	| "finaliteit"
																	| "persoonlijkheid",
																option.toString()
															);
														}
													}}
												/>
												<span>
													{typeof option === "number"
														? `${option}${
																filterName === "graad" ? "e graad" : "e jaar"
														  }`
														: option}
												</span>
											</label>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="studierichtingen-results">
					{loading ? (
						<div className="loading-message">Studierichtingen laden...</div>
					) : error ? (
						<div className="error-message">Error: {error}</div>
					) : filteredStudierichtingen.length === 0 ? (
						<div className="no-results-message">
							Geen studierichtingen gevonden voor de geselecteerde filters.
						</div>
					) : (
						<>
							<div className="studierichtingen-grid">
								{filteredStudierichtingen
									.slice(0, visibleItems)
									.map((studierichting) => (
										<div
											key={`${studierichting.id}-${studierichting.currentJaar}`}
											className="studierichting-card"
											onClick={() =>
												handleStudierichtingClick(
													studierichting.id,
													studierichting.currentJaar
												)
											}
										>
											<div className="studierichting-image-container">
												<img
													src={getImageUrl(
														studierichting.afbeelding,
														"studierichtingen"
													)}
													alt={studierichting.naam_richting}
													className="studierichting-image"
												/>
											</div>
											<div className="studierichting-content">
												<div className="studierichting-header">
													<span className="studierichting-graad">
														{studierichting.graad}e graad
													</span>
													<h3 className="studierichting-title">
														{studierichting.naam_richting}
													</h3>
													<div className="studierichting-details">
														<span>{studierichting.currentJaar}e Jaar</span>
														<span className="separator">|</span>
														<span>{studierichting.studiedomein || "Geen"}</span>
														<span className="separator">|</span>
														<span>{studierichting.finaliteit || "Geen"}</span>
													</div>
												</div>
											</div>
										</div>
									))}
								{filteredStudierichtingen.length > visibleItems && (
									<div className="load-more-button-container">
										<button onClick={loadMore} className="load-more-button">
											Laad meer
										</button>
									</div>
								)}
							</div>
							<div className="cta-section">
								<div className="cta-content">
									<h2>
										Doe de test en
										<br />
										krijg passende
										<br />
										studies!
									</h2>
									<p>
										Ontdek welke studierichtingen
										<br />
										bij jouw persoonlijkheid passen
									</p>
									<button
										onClick={() => navigate("/persoonlijkheidstestintro")}
										className="cta-button"
									>
										Start test
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default FilterStudierichtingen;
