import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import "../style/Carousel/Beroepencarousel.css";
import arrowRight from "../assets/arrow-right-carousel.svg";
import { type Beroep, getImageUrl } from "../services/supabaseService";

interface BeroepenCarouselProps {
	beroepen: Beroep[];
	leftPadding?: string;
	title?: ReactNode;
	showPersonalityIndicators?: boolean;
}

const typeColors: { [key: string]: string } = {
	Artistiek: "#A883CA",
	Sociaal: "#87CA83",
	Ondernemend: "#FF6366",
	Onderzoeker: "#5C4E9B",
	Conventioneel: "#009298",
	Realistisch: "#48A6BB"
};

const BeroepenCarousel: React.FC<BeroepenCarouselProps> = ({
	beroepen,
	leftPadding = "9rem",
	title,
	showPersonalityIndicators = false
}) => {
	const navigate = useNavigate();
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: "auto",
			spacing: 32
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		}
	});

	const goToNextSlide = () => {
		if (!instanceRef.current) return;
		instanceRef.current.next();
	};

	const goToPrevSlide = () => {
		if (!instanceRef.current) return;
		instanceRef.current.prev();
	};

	const handleBeroepClick = (beroepId: number) => {
		navigate(`/beroep/${beroepId}`);
	};

	const cssVariables = useMemo(() => {
		return {
			"--left-padding": leftPadding
		} as React.CSSProperties;
	}, [leftPadding]);

	return (
		<div className="beroepen-carousel-container" style={cssVariables}>
			{title && <h2 className="beroepen-carousel-title">{title}</h2>}
			<div className="beroepen-carousel-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{beroepen.map((beroep) => (
						<div
							key={beroep.id}
							className="keen-slider__slide beroepen-carousel-slide"
							onClick={() => handleBeroepClick(beroep.id)}
							style={{ cursor: "pointer" }}
						>
							<div className="beroepen-carousel-slide-container">
								<div
									className="beroepen-carousel-slide-image"
									style={
										{
											"--image-url": `url(${getImageUrl(
												beroep.afbeelding,
												"beroepen"
											)})`,
											backgroundImage: `url(${getImageUrl(
												beroep.afbeelding,
												"beroepen"
											)})`
										} as React.CSSProperties
									}
								></div>

								<div className="beroepen-carousel-slide-title-overlay">
									<h3 className="beroepen-carousel-slide-title">
										{beroep.naam_beroep}
									</h3>
									{showPersonalityIndicators && (
										<div className="beroepen-carousel-personality-types">
											{beroep.persoonlijkheidstype.map((type) => (
												<div
													key={type}
													className="beroepen-carousel-personality-indicator"
													style={{ backgroundColor: typeColors[type] }}
													title={type}
												/>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{currentSlide > 0 && (
					<div
						className="beroepen-carousel-prev-button"
						onClick={goToPrevSlide}
						style={{ display: "flex" }}
					>
						<img
							src={arrowRight}
							alt="Previous"
							width="48"
							height="48"
							className="beroepen-carousel-arrow-icon"
							style={{ pointerEvents: "none" }}
						/>
					</div>
				)}

				<div className="beroepen-carousel-next-button" onClick={goToNextSlide}>
					<img
						src={arrowRight}
						alt="Next"
						width="48"
						height="48"
						className="beroepen-carousel-arrow-icon"
						style={{ pointerEvents: "none" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default BeroepenCarousel;
