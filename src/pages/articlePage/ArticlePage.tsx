import React, { FC, useState, useMemo } from 'react';
import { useArticlePage } from './logic/useArticlePage';
import { Question } from '../../app/types';
import styles from './ArticlePage.module.scss';
import { shuffleAnswers } from '../../helpers/shuffleAnswers';

const ArticlePage: FC = () => {
  const { state, articleId } = useArticlePage();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const shuffledQuestions = useMemo(() => {
    return state.questions.map((question: Question) => ({
      ...question,
      answers: shuffleAnswers(question),
    }));
  }, [state.questions]);

  const handleAnswerSelection = (
    selectedAnswer: string,
    questionId: number,
  ) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelection = { ...prevSelectedAnswers };
      updatedSelection[questionId] = selectedAnswer;
      return updatedSelection;
    });
  };

  return (
    <div className={styles.container}>
      <p>{state.article.content}</p>
      <div className={styles.questionsContainer}>
        <p className={styles.text}>Questions</p>
        {shuffledQuestions
          .filter(
            (question: Question) => question.articleId.toString() === articleId,
          )
          .map((question: Question) => (
            <div key={question.id}>
              <p className={styles.questionTitle}>{question.question}</p>
              <div className={styles.answersContainer}>
                {question.answers.map((answer: string) => (
                  <div key={answer} className={styles.answerContainer}>
                    <input
                      id={answer}
                      type="radio"
                      name={question.id.toString()}
                      className={styles.input}
                      value={answer}
                      onChange={() =>
                        handleAnswerSelection(answer, question.id)
                      }
                    />
                    <label htmlFor={answer} className={styles.label}>
                      {answer}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

        <div>
          {shuffledQuestions
            .filter(
              (question: Question) =>
                question.articleId.toString() === articleId,
            )
            .map((question: Question) => (
              <div key={question.id}>
                <p className={styles.questionTitle}>{question.question}</p>
                <p>Correct answer: {question.correctAnswer}</p>
                <p>Your answer: {selectedAnswers[question.id]}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
