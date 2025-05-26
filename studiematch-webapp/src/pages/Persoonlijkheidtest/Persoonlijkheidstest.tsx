import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../style/Persoonlijkheidtest/persoonlijkheidstest.css";
import { persoonlijkheidstestVragen } from "../../constants/persoonlijkheidstestVragen";
import { motion, AnimatePresence } from "framer-motion";
import arrowLeft from "../../assets/arrow-left.svg";
import Navigatie from "../../components/Navigatie";

interface Answer {
	questionId: number;
	type: string;
	answer: boolean;
}

interface TestResults {
	[key: string]: {
		positiveAnswers: number;
		percentage: number;
	};
}

const Persoonlijkheidstest: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const selectedGraad = location.state?.graad;
	const selectedJaar = location.state?.jaar;
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [direction, setDirection] = useState(1);

	const calculateResults = (finalAnswers: Answer[]) => {
		const results: TestResults = {
			Artistiek: { positiveAnswers: 0, percentage: 0 },
			Sociaal: { positiveAnswers: 0, percentage: 0 },
			Ondernemend: { positiveAnswers: 0, percentage: 0 },
			Realistisch: { positiveAnswers: 0, percentage: 0 },
			Conventioneel: { positiveAnswers: 0, percentage: 0 },
			Onderzoeker: { positiveAnswers: 0, percentage: 0 }
		};

		finalAnswers.forEach((answer) => {
			if (answer.answer) {
				results[answer.type].positiveAnswers++;
			}
		});

		const totalPositiveAnswers = Object.values(results).reduce(
			(sum, type) => sum + type.positiveAnswers,
			0
		);

		Object.keys(results).forEach((type) => {
			if (totalPositiveAnswers > 0) {
				results[type].percentage = Math.round(
					(results[type].positiveAnswers / totalPositiveAnswers) * 100
				);
			} else {
				results[type].percentage = Math.round(
					100 / Object.keys(results).length
				);
			}
		});

		const totalPercentage = Object.values(results).reduce(
			(sum, type) => sum + type.percentage,
			0
		);

		if (totalPercentage !== 100) {
			const diff = 100 - totalPercentage;
			const highestType = Object.entries(results).sort(
				([, a], [, b]) => b.percentage - a.percentage
			)[0][0];
			results[highestType].percentage += diff;
		}

		const sortedTypes = Object.entries(results)
			.sort(([, a], [, b]) => b.percentage - a.percentage)
			.slice(0, 3)
			.map(([type, data]) => ({
				name: type,
				percentage: data.percentage,
				className: type.toLowerCase()
			}));

		return sortedTypes;
	};

	const handleAnswer = (answer: boolean) => {
		const currentQuestion = persoonlijkheidstestVragen[currentQuestionIndex];

		const newAnswers = [
			...answers,
			{
				questionId: currentQuestion.id,
				type: currentQuestion.type,
				answer: answer
			}
		];

		setAnswers(newAnswers);
		setDirection(1);

		if (currentQuestionIndex < persoonlijkheidstestVragen.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			handleFinishTest();
		}
	};

	const handleBack = () => {
		if (currentQuestionIndex > 0) {
			setDirection(-1);
			setCurrentQuestionIndex(currentQuestionIndex - 1);
			setAnswers(answers.slice(0, -1));
		}
	};

	const handleFinishTest = () => {
		const results = calculateResults(answers);
		navigate("/testresultaten", {
			state: { results, graad: Number(selectedGraad), jaar: selectedJaar }
		});
	};

	const currentQuestion = persoonlijkheidstestVragen[currentQuestionIndex];
	const colorIndex = (currentQuestionIndex % 6) + 1;

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		}),
		center: {
			x: 0,
			opacity: 1
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -1000 : 1000,
			opacity: 0
		})
	};

	return (
		<div
			className={`persoonlijkheidstest-container persoonlijkheidstest-color-${colorIndex}`}
		>
			<Navigatie />
			<h3 className="persoonlijkheidstest-question-counter">
				Vraag {currentQuestionIndex + 1}
			</h3>
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={currentQuestionIndex}
					custom={direction}
					variants={slideVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 }
					}}
					className="persoonlijkheidstest-question-container"
				>
					<h2 className="persoonlijkheidstest-question-text">
						{currentQuestion.text}
					</h2>
					<div className="persoonlijkheidstest-buttons-container">
						<motion.button
							className="persoonlijkheidstest-answer-button persoonlijkheidstest-yes-button"
							onClick={() => handleAnswer(true)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Ja
						</motion.button>
						<motion.button
							className="persoonlijkheidstest-answer-button persoonlijkheidstest-no-button"
							onClick={() => handleAnswer(false)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Nee
						</motion.button>
					</div>
				</motion.div>
			</AnimatePresence>
			<div className="persoonlijkheidstest-question-progress">
				<div className="persoonlijkheidstest-progress-bar-container">
					<div
						className="persoonlijkheidstest-progress-bar"
						style={{
							width: `${
								((currentQuestionIndex + 1) /
									persoonlijkheidstestVragen.length) *
								100
							}%`
						}}
					/>
				</div>
			</div>
			{currentQuestionIndex > 0 && (
				<motion.button
					className="persoonlijkheidstest-back-button"
					onClick={handleBack}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<img src={arrowLeft} alt="Go back" />
				</motion.button>
			)}
		</div>
	);
};

export default Persoonlijkheidstest;
