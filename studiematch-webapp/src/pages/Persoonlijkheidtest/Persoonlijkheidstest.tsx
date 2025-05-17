import React, { useState } from "react";
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

const Persoonlijkheidstest: React.FC = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [direction, setDirection] = useState(1);

	const handleAnswer = (answer: boolean) => {
		const currentQuestion = persoonlijkheidstestVragen[currentQuestionIndex];

		setAnswers([
			...answers,
			{
				questionId: currentQuestion.id,
				type: currentQuestion.type,
				answer: answer
			}
		]);

		setDirection(1);
		if (currentQuestionIndex < persoonlijkheidstestVragen.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			console.log("Test completed!", answers);
		}
	};

	const handleBack = () => {
		if (currentQuestionIndex > 0) {
			setDirection(-1);
			setCurrentQuestionIndex(currentQuestionIndex - 1);
			setAnswers(answers.slice(0, -1));
		}
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
		<div className={`personality-test-container color-${colorIndex}`}>
			<Navigatie />
			<h3 className="question-counter">Vraag {currentQuestionIndex + 1}</h3>
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
					className="question-container"
				>
					<h2 className="question-text">{currentQuestion.text}</h2>
					<div className="buttons-container">
						<motion.button
							className="answer-button yes-button"
							onClick={() => handleAnswer(true)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Ja
						</motion.button>
						<motion.button
							className="answer-button no-button"
							onClick={() => handleAnswer(false)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Nee
						</motion.button>
					</div>
				</motion.div>
			</AnimatePresence>
			<div className="question-progress">
				<div className="progress-bar-container">
					<div
						className="progress-bar"
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
					className="back-button"
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
