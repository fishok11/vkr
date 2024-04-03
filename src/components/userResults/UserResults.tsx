import React, { FC } from 'react';
import styles from './UserResults.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useUserResults } from './logic/useUserResults';
import Loader from '../../UI/loader/Loader';
import { Chapter } from '../../app/types';
import AttemptModal from '../attemptModal/AttemptModal';

type UserResultsParams = {
  userId: string;
};

const UserResults: FC<UserResultsParams> = ({ userId }) => {
  const {
    stateMain,
    stateUser,
    cookies,
    activeIndexArticle,
    onTitleArticleClick,
    activeIndexChapter,
    onTitleChapterClick,
    filterChaptersByUserResults,
    handleShowResultModal,
  } = useUserResults({ userId });

  if (
    stateMain.isLoadingArticles ||
    stateMain.isLoadingQuestions ||
    stateUser.isLoadingGetUserResults
  ) {
    return <Loader />;
  }

  return (
    <>
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
              </button>
              {activeIndexChapter === chapter.id && (
                <div className={styles.accordionContainer}>
                  {stateMain.articles
                    .filter(
                      (article) =>
                        article.chapterId == chapter.id &&
                        stateUser.results
                          .filter((result) => result.userId == userId)
                          .map((result) => result.articleId)
                          .includes(article.id),
                    )
                    .map((article) => (
                      <React.Fragment key={article.id}>
                        <button
                          className={styles.articleTitle}
                          onClick={() => onTitleArticleClick(article.id)}
                        >
                          <h3>{article.title}</h3>
                        </button>
                        {activeIndexArticle === article.id && (
                          <div className={styles.tableContainer}>
                            <table className={styles.table}>
                              <thead className={styles.tableHead}>
                                <tr>
                                  <th
                                    scope="col"
                                    className={styles.tableHeadItem}
                                  >
                                    Имя
                                  </th>
                                  <th
                                    scope="col"
                                    className={styles.tableHeadItem}
                                  >
                                    Курс
                                  </th>
                                  <th
                                    scope="col"
                                    className={styles.tableHeadItem}
                                  >
                                    Попытка
                                  </th>
                                  <th
                                    scope="col"
                                    className={styles.tableHeadItem}
                                  >
                                    Cредний балл
                                  </th>
                                  <th
                                    scope="col"
                                    className={styles.tableHeadItem}
                                  />
                                </tr>
                              </thead>
                              <tbody className={styles.tableBody}>
                                {stateUser.results
                                  .filter(
                                    (result) =>
                                      result.userId === cookies.user &&
                                      result.articleId === article.id,
                                  )
                                  .map((result, indexResult) => (
                                    <tr
                                      className={styles.tableRow}
                                      key={result.id}
                                    >
                                      <td className={styles.tableRowItem}>
                                        {result.userId === userId
                                          ? 'Вы'
                                          : userId}
                                      </td>
                                      <td className={styles.tableRowItem}>
                                        {article.title}
                                      </td>
                                      <td className={styles.tableRowItem}>
                                        {indexResult + 1}
                                      </td>
                                      <td className={styles.tableRowItem}>
                                        {Math.floor(result.averageGrade)}
                                      </td>
                                      <td className={styles.tableRowItem}>
                                        <button
                                          className={styles.button}
                                          onClick={() =>
                                            handleShowResultModal(
                                              result,
                                              result.articleId,
                                            )
                                          }
                                        >
                                          Посмотреть попытку
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              )}
            </React.Fragment>
          ),
        )}
      </div>
      {stateUser.resultModal && (
        <AttemptModal articleId={stateUser.articleIdForResultModal} />
      )}
    </>
  );
};

export default UserResults;
