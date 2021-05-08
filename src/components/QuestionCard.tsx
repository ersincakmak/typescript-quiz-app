import React from 'react'
import { AnswerObject } from '../App'

type Props = {
	question: string
	answers: string[]
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void
	userAnswer: AnswerObject | undefined
	questionNr: number
	totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNr,
	totalQuestions,
}) => {
	console.log(answers)
	return (
		<div className='text-2xl'>
			<p className='border-b-2 border-black my-4'>
				Question : {questionNr} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }} />
			<div>
				{answers.map((answer) => (
					<div key={answer}>
						<button
							className={`border-2 border-white rounded-xl w-full my-1 disabled:cursor-not-allowed px-2 py-1 shadow-inner  focus:ring-2 focus:ring-purple-500 focus:shadow-none focus:outline-none text-white ${
								userAnswer?.answer === answer
									? userAnswer?.correctAnswer === answer
										? 'bg-green-500 ring-2 ring-purple-500'
										: 'bg-red-500 ring-2 ring-purple-500'
									: userAnswer?.correctAnswer === answer
									? 'bg-green-500'
									: ' bg-purple-500'
							}`}
							disabled={userAnswer ? true : false}
							onClick={callback}
							value={answer}
						>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuestionCard
