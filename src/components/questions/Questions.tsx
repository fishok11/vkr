import React, { FC } from 'react';
import styles from './Questions.module.scss';
import { useQuestions } from './logic/useQuestions';
import { Question } from '../../app/types';
import Button from '../../UI/button/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

type QuestionsProps = {
  articleTitle: string;
};

const Questions: FC<QuestionsProps> = ({ articleTitle }) => {
  const {
    stateMain,
    stateUser,
    articleId,
    handleAnswerSelection,
    handleAddResult,
    newAttempt,
    handleNewAttempt,
    checkUserResults,
    calcQuantityAttempt,
    errorMessage,
    cookies,
  } = useQuestions();

  if (!articleId) {
    return <p>Курс не найден</p>;
  }

  return (
    <div className={styles.questionsContainer}>
      {(!checkUserResults(cookies.user, articleId) || newAttempt) && (
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

      {checkUserResults(cookies.user, articleId) && !newAttempt && (
        <>
          <h2 className={styles.text}>Результаты</h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th scope="col" className={styles.tableHeadItem}>
                    Имя
                  </th>
                  <th scope="col" className={styles.tableHeadItem}>
                    Курс
                  </th>
                  <th scope="col" className={styles.tableHeadItem}>
                    Попытка
                  </th>
                  <th scope="col" className={styles.tableHeadItem}>
                    Cредний балл
                  </th>
                  <th scope="col" className={styles.tableHeadItem} />
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {stateUser.results
                  .filter(
                    (result) =>
                      result.userId === cookies.user &&
                      result.articleId === articleId,
                  )
                  .map((result, indexResult) => (
                    // <div key={question.id}>
                    //   <h3 className={styles.questionTitle}>
                    //     {stateUser.resultOfTheArticle.userAnswers[
                    //       parseInt(question.id)
                    //     ] === question.correctAnswer && (
                    //       <FontAwesomeIcon
                    //         icon={faCheck}
                    //         className={styles.correctIco}
                    //       />
                    //     )}
                    //     {stateUser.resultOfTheArticle.userAnswers[
                    //       parseInt(question.id)
                    //     ] !== question.correctAnswer && (
                    //       <FontAwesomeIcon
                    //         icon={faXmark}
                    //         className={styles.incorrectIco}
                    //       />
                    //     )}{' '}
                    //     {question.question}
                    //   </h3>
                    //   <div>
                    //     <p>
                    //       <b>Правильный ответ:</b> {question.correctAnswer}
                    //     </p>
                    //     <p>
                    //       <b>Ваш ответ:</b>{' '}
                    //       {
                    //         stateUser.resultOfTheArticle.userAnswers[
                    //           parseInt(question.id)
                    //         ]
                    //       }
                    //     </p>
                    //   </div>
                    // </div>

                    <tr className={styles.tableRow} key={result.id}>
                      <td className={styles.tableRowItem}>Вы</td>
                      <td className={styles.tableRowItem}>{articleTitle}</td>
                      <td className={styles.tableRowItem}>{indexResult + 1}</td>
                      <td className={styles.tableRowItem}>
                        {Math.floor(result.averageGrade)}
                      </td>
                      <td className={styles.tableRowItem}>
                        <button className={styles.button}>
                          Посмотреть попытку
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p className={styles.attemptQuantityText}>
            У вас осталось попыток:{' '}
            {3 - calcQuantityAttempt(cookies.user, articleId)}
          </p>
          {calcQuantityAttempt(cookies.user, articleId) < 3 && (
            <div className={styles.buttonContainer}>
              <Button
                text={'Попробовать еще'}
                onClick={() => handleNewAttempt()}
              />
            </div>
          )}
        </>
      )}
      {!cookies.user && (
        <div className={styles.lockQuestions}>
          <h2 className={styles.lockQuestionsTitle}>
            Чтобы пройти тест зарегистрируйтесь!
          </h2>
        </div>
      )}
    </div>
  );
};

export default Questions;
