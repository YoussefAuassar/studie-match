import React, { useState, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../style/Carousel/Studierichtingencarousel.css";
import arrowRight from "../assets/arrow-right-carousel.svg";
import heartOutline from "../assets/heart-outline.svg";
import { type Studierichting, getImageUrl } from "../services/supabaseService";

interface StudierichtingenCarouselProps {
	studierichtingen: Studierichting[];
	leftPadding?: string;
	title?: string;
}

const StudierichtingenCarousel: React.FC<StudierichtingenCarouselProps> = ({
	studierichtingen,
	leftPadding = "9rem",
	title
}) => {
	const [, setCurrentSlide] = useState<number>(0);
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

	const cssVariables = useMemo(() => {
		return {
			"--left-padding": leftPadding
		} as React.CSSProperties;
	}, [leftPadding]);

	return (
		<div className="carousel-container" style={cssVariables}>
			{title && <h2 className="carousel-title">{title}</h2>}
			<div className="carousel-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{studierichtingen.map((studierichting) => (
						<div
							key={studierichting.id}
							className="keen-slider__slide carousel-slide"
						>
							<div className="slide-container">
								<div
									className="slide-image"
									style={
										{
											"--image-url": `url(${getImageUrl(
												studierichting.afbeelding
											)})`,
											backgroundImage: `url(${getImageUrl(
												studierichting.afbeelding
											)})`
										} as React.CSSProperties
									}
								>
									<div className="favorite-button">
										<img
											src={heartOutline}
											alt="Favorite"
											width="24"
											height="24"
											className="heart-icon"
										/>
									</div>
								</div>

								<div className="slide-title-overlay">
									<h3 className="slide-title">
										{studierichting.naam_richting}
									</h3>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="carousel-next-button">
					<div className="next-button" onClick={goToNextSlide}>
						<img
							src={arrowRight}
							alt="Next"
							width="48"
							height="48"
							className="arrow-icon"
							style={{ pointerEvents: "none" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudierichtingenCarousel;
