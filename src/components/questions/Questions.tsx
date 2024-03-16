import React, { FC } from 'react';
import styles from './Questions.module.scss';
import { useQuestions } from './logic/useQuestions';
import { Question } from '../../app/types';
import Button from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const Questions: FC = () => {
  const {
    stateMain,
    stateUser,
    articleId,
    handleAnswerSelection,
    handleAddResult,
    errorMessage,
    cookies,
  } = useQuestions();

  if (cookies.user === undefined) {
    return (
      <div className={styles.questionsContainer}>
        <h2 className={'text-center'}>
          Войдите или зарагистрируйтесь чтоб открыть тесты
        </h2>
      </div>
    );
  }

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
          {errorMessage && (
            <p className={styles.errorMessage}>Ответьте на все вопросы</p>
          )}
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
                <h3 className={styles.questionTitle}>
                  {stateUser.resultOfTheArticle.userAnswers[
                    parseInt(question.id)
                  ] === question.correctAnswer && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.correctIco}
                    />
                  )}
                  {stateUser.resultOfTheArticle.userAnswers[
                    parseInt(question.id)
                  ] !== question.correctAnswer && (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={styles.incorrectIco}
                    />
                  )}{' '}
                  {question.question}
                </h3>
                <div>
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
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Questions;
