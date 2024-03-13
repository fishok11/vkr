import React, { FC } from 'react';
import styles from './Questions.module.scss';
import { useQuestions } from './logic/useQuestions';
import { Question } from '../../app/types';
import Button from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';

const Questions: FC = () => {
  const {
    stateMain,
    stateUser,
    articleId,
    handleAnswerSelection,
    selectedAnswers,
    handleAddResult,
  } = useQuestions();

  if (stateMain.isLoadingQuestions) return <Loader />;

  return (
    <div className={styles.questionsContainer}>
      {!stateUser.resultOfTheArticle.articleId && (
        <>
          <h2 className={styles.text}>Вопросы</h2>
          {stateMain.questions
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
                          handleAnswerSelection(question.id, answer)
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
            <Button
              text={'Посмотреть результаты'}
              onClick={() => handleAddResult()}
            />
          </div>
        </>
      )}

      {stateUser.resultOfTheArticle.articleId === articleId && (
        <>
          <h2 className={styles.text}>Результаты</h2>
          {stateMain.questions
            .filter(
              (question: Question) =>
                question.articleId.toString() == articleId,
            )
            .map((question: Question) => (
              <div key={question.id}>
                <h3 className={styles.questionTitle}>{question.question}</h3>
                <p>
                  <b>Правильный ответ:</b> {question.correctAnswer}
                </p>
                <p>
                  <b>Ваш ответ:</b>{' '}
                  {
                    stateUser.resultOfTheArticle.userAnswers[
                      parseInt(question.id)
                    ]
                  }
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Questions;
