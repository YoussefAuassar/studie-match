import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../style/Carousel/PersoonlijkheidTypesCarousel.css";
import arrowRight from "../assets/arrow-right-carousel.svg";
import { useNavigate } from "react-router-dom";

interface PersoonlijkheidType {
	id: number;
	type: string;
	kleur: string;
	path: string;
}

interface PersoonlijkheidTypesCarouselProps {
	title?: React.ReactNode;
	currentType?: string;
}

const persoonlijkheidTypes: PersoonlijkheidType[] = [
	{
		id: 1,
		type: "Artistiek",
		kleur: "#A883CA",
		path: "/artistiek"
	},
	{
		id: 2,
		type: "Sociaal",
		kleur: "#87CA83",
		path: "/sociaal"
	},
	{
		id: 3,
		type: "Ondernemend",
		kleur: "#FF6366",
		path: "/ondernemend"
	},
	{
		id: 4,
		type: "Onderzoeker",
		kleur: "#5C4E9B",
		path: "/onderzoeker"
	},
	{
		id: 5,
		type: "Conventioneel",
		kleur: "#009298",
		path: "/conventioneel"
	},
	{
		id: 6,
		type: "Realistisch",
		kleur: "#48A6BB",
		path: "/realistisch"
	}
];

const PersoonlijkheidTypesCarousel: React.FC<
	PersoonlijkheidTypesCarouselProps
> = ({ title, currentType }) => {
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

	const filteredTypes = currentType
		? persoonlijkheidTypes.filter((type) => type.type !== currentType)
		: persoonlijkheidTypes;

	const goToNextSlide = () => {
		if (!instanceRef.current) return;
		instanceRef.current.next();
	};

	const goToPrevSlide = () => {
		if (!instanceRef.current) return;
		instanceRef.current.prev();
	};

	return (
		<div className="persoonlijkheid-carousel-container">
			{title}
			<div className="persoonlijkheid-carousel-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{filteredTypes.map((type) => (
						<div
							key={type.id}
							className="keen-slider__slide persoonlijkheid-carousel-slide"
							onClick={() => navigate(type.path)}
							style={{ cursor: "pointer" }}
						>
							<div className="persoonlijkheid-carousel-slide-container">
								<div
									className="persoonlijkheid-carousel-slide-content"
									style={{ backgroundColor: type.kleur }}
								>
									<div className="persoonlijkheid-type-label">{type.type}</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{currentSlide > 0 && (
					<div
						className="persoonlijkheid-carousel-prev-button"
						onClick={goToPrevSlide}
						style={{ display: "flex" }}
					>
						<img
							src={arrowRight}
							alt="Previous"
							width="48"
							height="48"
							className="persoonlijkheid-carousel-arrow-icon"
							style={{ pointerEvents: "none" }}
						/>
					</div>
				)}

				<div
					className="persoonlijkheid-carousel-next-button"
					onClick={goToNextSlide}
				>
					<img
						src={arrowRight}
						alt="Next"
						width="48"
						height="48"
						className="persoonlijkheid-carousel-arrow-icon"
						style={{ pointerEvents: "none" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PersoonlijkheidTypesCarousel;
