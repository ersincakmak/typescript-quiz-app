import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { fetchQuestions } from './API'
import { Difficulty, QuestionState } from './API'
import './index.css'

export type AnswerObject = {
	question: string
	answer: string
	correct: boolean
	correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {
	const [loading, setLoading] = useState(false)
	const [questions, setQuestions] = useState<QuestionState[]>([])
	const [number, setNumber] = useState(0)
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
	const [score, setScore] = useState(0)
	const [gameOver, setGameOver] = useState(true)

	const startTrivia = async () => {
		setLoading(true)
		setGameOver(false)

		const newQuestions = await fetchQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY
		)

		setQuestions(newQuestions)
		setScore(0)
		setUserAnswers([])
		setNumber(0)
		setLoading(false)
	}

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			const answer = e.currentTarget.value
			const correct = questions[number].correct_answer === answer
			if (correct) setScore((prev) => prev + 1)
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			}
			setUserAnswers((prev) => [...prev, answerObject])
		}
	}

	const nextQuestion = () => {
		const nextQuestion = number + 1

		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true)
		} else {
			setNumber(nextQuestion)
		}
	}

	return (
		<div className='w-full flex flex-col h-screen items-center justify-center'>
			<h1 className='text-4xl font-semibold'>React Quiz</h1>
			{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
				<button
					className='border-white bg-purple-600 border-2 rounded-lg py-1 px-2 mt-4 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700'
					onClick={startTrivia}
				>
					Start
				</button>
			) : null}

			{!gameOver ? <p className='font-medium'>Score: {score}</p> : null}

			{loading && <p>Loading Questions ...</p>}
			{!loading && !gameOver && (
				<QuestionCard
					questionNr={number + 1}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[number].question}
					answers={questions[number].answer}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
				/>
			)}
			{!gameOver &&
			!loading &&
			userAnswers.length === number + 1 &&
			number !== TOTAL_QUESTIONS - 1 ? (
				<button
					className='underline text-purple-600 focus:outline-none text-2xl'
					onClick={nextQuestion}
				>
					Next Question
				</button>
			) : null}
		</div>
	)
}

export default App
