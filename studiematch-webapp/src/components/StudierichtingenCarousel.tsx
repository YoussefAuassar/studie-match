import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import "../style/Carousel/Studierichtingencarousel.css";
import arrowRight from "../assets/arrow-right-carousel.svg";
import { type Studierichting, getImageUrl } from "../services/supabaseService";

interface StudierichtingenCarouselProps {
	studierichtingen: Studierichting[];
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

const StudierichtingenCarousel: React.FC<StudierichtingenCarouselProps> = ({
	studierichtingen,
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

	const handleStudierichtingClick = (studierichtingId: number) => {
		navigate(`/studierichting/${studierichtingId}`);
	};

	const cssVariables = useMemo(() => {
		return {
			"--left-padding": leftPadding
		} as React.CSSProperties;
	}, [leftPadding]);

	return (
		<div className="studierichtingen-carousel-container" style={cssVariables}>
			{title && <h2 className="studierichtingen-carousel-title">{title}</h2>}
			<div className="studierichtingen-carousel-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{studierichtingen.map((studierichting) => (
						<div
							key={studierichting.id}
							className="keen-slider__slide studierichtingen-carousel-slide"
							onClick={() => handleStudierichtingClick(studierichting.id)}
							style={{ cursor: "pointer" }}
						>
							<div className="studierichtingen-carousel-slide-container">
								<div
									className="studierichtingen-carousel-slide-image"
									style={
										{
											"--image-url": `url(${getImageUrl(
												studierichting.afbeelding,
												"studierichtingen"
											)})`,
											backgroundImage: `url(${getImageUrl(
												studierichting.afbeelding,
												"studierichtingen"
											)})`
										} as React.CSSProperties
									}
								></div>

								<div className="studierichtingen-carousel-slide-title-overlay">
									<h3 className="studierichtingen-carousel-slide-title">
										{studierichting.naam_richting}
									</h3>
									{showPersonalityIndicators && (
										<div className="studierichtingen-carousel-personality-types">
											{studierichting.persoonlijkheidstype.map((type) => (
												<div
													key={type}
													className="studierichtingen-carousel-personality-indicator"
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
						className="studierichtingen-carousel-prev-button"
						onClick={goToPrevSlide}
						style={{ display: "flex" }}
					>
						<img
							src={arrowRight}
							alt="Previous"
							width="48"
							height="48"
							className="studierichtingen-carousel-arrow-icon"
							style={{ pointerEvents: "none" }}
						/>
					</div>
				)}

				<div
					className="studierichtingen-carousel-next-button"
					onClick={goToNextSlide}
				>
					<img
						src={arrowRight}
						alt="Next"
						width="48"
						height="48"
						className="studierichtingen-carousel-arrow-icon"
						style={{ pointerEvents: "none" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default StudierichtingenCarousel;
