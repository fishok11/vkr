import React, { FC } from 'react';
import styles from './UserResults.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useUserResults } from './logic/useUserResults';
import Loader from '../../UI/loader/Loader';

const UserResults: FC = () => {
  const { stateMain, stateUser, activeIndex, onTitleClick } = useUserResults();

  if (
    stateMain.isLoadingArticles ||
    stateMain.isLoadingQuestions ||
    stateUser.isLoadingGetUserResults
  )
    return <Loader />;

  return (
    <div className={styles.resultsContainer}>
      {stateUser.userResults.map((result) => (
        <div className={styles.accordionContainer} key={result.id}>
          {stateMain.articles
            .filter((article) => article.id == result.articleId)
            .map((article) => (
              <button
                key={article.id}
                className={styles.articleTitle}
                onClick={() => onTitleClick(article.id)}
              >
                <h2>{article.title}</h2>
              </button>
            ))}

          {activeIndex === result.articleId && (
            <div className={styles.questionsContainer}>
              {stateMain.questions
                .filter(
                  (question) =>
                    question.articleId.toString() == result.articleId,
                )
                .map((question) => (
                  <div className={styles.questionContainer} key={question.id}>
                    <h3 className={styles.questionTitle}>
                      {result.userAnswers[question.id] ===
                        question.correctAnswer && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.correctIco}
                        />
                      )}
                      {result.userAnswers[question.id] !==
                        question.correctAnswer && (
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={styles.incorrectIco}
                        />
                      )}{' '}
                      {question.question}
                    </h3>
                    <div>
                      <p>
                        <b>Ваш ответ: </b>
                        {result.userAnswers[question.id]}
                      </p>
                      <p>
                        <b>Правильный ответ: </b>
                        {question.correctAnswer}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserResults;
