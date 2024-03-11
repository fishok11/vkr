import React, { FC } from 'react';
import styles from './Questions.module.scss';
import { useQuestions } from './logic/useQuestions';
import { Question } from '../../app/types';
import Button from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';

type QuestionsProps = {
  articleId: string | undefined;
  showResults: boolean;
  onClick: () => void;
};

const Questions: FC<QuestionsProps> = ({ articleId, showResults, onClick }) => {
  const { state, handleAnswerSelection, selectedAnswers } = useQuestions();

  if (state.isLoadingQuestions) return <Loader />;

  return (
    <div className={styles.questionsContainer}>
      {!showResults && (
        <>
          <h2 className={styles.text}>Вопросы</h2>
          {state.questions
            .filter(
              (question: Question) =>
                question.articleId.toString() === articleId,
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
                          handleAnswerSelection(answer, parseInt(question.id))
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
          <div className={styles.buttonContainer}>
            <Button text={'Посмотреть результаты'} onClick={onClick} />
          </div>
        </>
      )}

      {showResults && (
        <>
          <h2 className={styles.text}>Результаты</h2>
          {state.questions
            .filter(
              (question: Question) =>
                question.articleId.toString() == articleId,
            )
            .map((question: Question) => (
              <div key={question.id}>
                <p className={styles.questionTitle}>{question.question}</p>
                <p>
                  <b>Правильный ответ:</b> {question.correctAnswer}
                </p>
                <p>
                  <b>Ваш ответ:</b> {selectedAnswers[parseInt(question.id)]}
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Questions;