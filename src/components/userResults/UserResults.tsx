import React, { FC } from 'react';
import styles from './UserResults.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useUserResults } from './logic/useUserResults';
import Loader from '../../UI/loader/Loader';
import { Chapter, Result } from '../../app/types';

type UserResultsParams = {
  userId: string;
};

const UserResults: FC<UserResultsParams> = ({ userId }) => {
  const { stateMain, stateUser, activeIndex, onTitleClick, filterChapters } =
    useUserResults({ userId });

  if (
    stateMain.isLoadingArticles ||
    stateMain.isLoadingQuestions ||
    stateUser.isLoadingGetUserResults
  ) {
    return <Loader />;
  }

  return (
    <div className={styles.resultsContainer}>
      {filterChapters(stateMain.chapters, stateUser.results).map(
        (chapter: Chapter) => (
          <React.Fragment key={chapter.id}>
            <h2>{chapter.chapter}</h2>
            {stateUser.results
              .filter(
                (result) =>
                  result.chapterId == chapter.id && result.userId == userId,
              )
              .map((result) => (
                <div className={styles.accordionContainer} key={result.id}>
                  {stateMain.articles
                    .filter(
                      (article) =>
                        article.id == result.articleId &&
                        article.chapterId == chapter.id,
                    )
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
                            question.articleId.toString() === result.articleId,
                        )
                        .map((question) => (
                          <div
                            className={styles.questionContainer}
                            key={question.id}
                          >
                            <h3 className={styles.questionTitle}>
                              {result.userAnswers[question.id] ===
                              question.correctAnswer ? (
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={styles.correctIco}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTimes}
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
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default UserResults;
