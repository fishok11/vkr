import React, { FC } from 'react';
import styles from './UserResults.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useUserResults } from './logic/useUserResults';
import Loader from '../../UI/loader/Loader';
import { Chapter } from '../../app/types';
import Badge from '../../UI/badge/Badge';

type UserResultsParams = {
  userId: string;
};

const UserResults: FC<UserResultsParams> = ({ userId }) => {
  const {
    stateMain,
    stateUser,
    activeIndexArticle,
    onTitleArticleClick,
    activeIndexChapter,
    onTitleChapterClick,
    filterChaptersByUserResults,
    calculationAverageGradeChapter,
  } = useUserResults({ userId });

  if (
    stateMain.isLoadingArticles ||
    stateMain.isLoadingQuestions ||
    stateUser.isLoadingGetUserResults
  ) {
    return <Loader />;
  }

  return (
    <div className={styles.resultsContainer}>
      {filterChaptersByUserResults(stateMain.chapters, stateUser.results).map(
        (chapter: Chapter) => (
          <React.Fragment key={chapter.id}>
            <button
              className={styles.chapterTitle}
              onClick={() => onTitleChapterClick(chapter.id)}
            >
              <h2>
                {chapter.chapter}{' '}
                {activeIndexChapter === chapter.id && (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
                {activeIndexChapter !== chapter.id && (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
              </h2>
              <Badge grade={calculationAverageGradeChapter(chapter.id)} />
            </button>
            {activeIndexChapter === chapter.id && (
              <>
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
                            onClick={() => onTitleArticleClick(article.id)}
                          >
                            <h3>{article.title}</h3>
                            <Badge grade={result.averageGrade} />
                          </button>
                        ))}
                      {activeIndexArticle === result.articleId && (
                        <div className={styles.questionsContainer}>
                          {stateMain.questions
                            .filter(
                              (question) =>
                                question.articleId.toString() ===
                                result.articleId,
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
              </>
            )}
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default UserResults;
