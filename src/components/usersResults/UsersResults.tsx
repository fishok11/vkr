import React from 'react';
import styles from './UsersResults.module.scss';
import { useUsersResults } from './logic/useUsersResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Chapter } from '../../app/types';
import AttemptModal from '../attemptModal/AttemptModal';
import Input from '../../UI/input/Input';

const UsersResults = () => {
  const {
    stateUser,
    stateMain,
    activeIndexArticle,
    activeIndexChapter,
    onTitleArticleClick,
    onTitleChapterClick,
    findUserName,
    handleShowResultModal,
    usernameToSearch,
    setUsernameToSearch,
    setAttempt,
  } = useUsersResults();

  return (
    <>
      <div className={styles.container}>
        {stateMain.chapters.map((chapter: Chapter) => (
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
              <div className={styles.articlesContainer}>
                {stateMain.articles
                  .filter(
                    (article) =>
                      article.chapterId == chapter.id &&
                      stateUser.results
                        .map((result) => result.articleId)
                        .includes(article.id),
                  )
                  .map((article) => (
                    <div className={styles.article} key={article.id}>
                      <button
                        className={styles.articleTitle}
                        onClick={() => onTitleArticleClick(article.id)}
                      >
                        <h3>
                          {article.title}{' '}
                          {activeIndexArticle === article.id && (
                            <FontAwesomeIcon icon={faCaretUp} />
                          )}
                          {activeIndexArticle !== article.id && (
                            <FontAwesomeIcon icon={faCaretDown} />
                          )}
                        </h3>
                      </button>
                      {activeIndexArticle === article.id && (
                        <>
                          <Input
                            id={'search'}
                            type={'text'}
                            placeholder={'Введите имя пользователя'}
                            value={usernameToSearch}
                            onChange={(e) =>
                              setUsernameToSearch(e.target.value)
                            }
                          />
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
                                      result.articleId === article.id &&
                                      findUserName(result.userId)
                                        .toLowerCase()
                                        .includes(
                                          usernameToSearch.toLowerCase(),
                                        ),
                                  )
                                  .map((result, indexResult) => (
                                    <tr
                                      className={styles.tableRow}
                                      key={result.id}
                                    >
                                      <td className={styles.tableRowItem}>
                                        {findUserName(result.userId)}
                                      </td>
                                      <td className={styles.tableRowItem}>
                                        {article.title}
                                      </td>
                                      <td className={styles.tableRowItem}>
                                        {setAttempt(result)}
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
                        </>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {stateUser.resultModal && (
        <AttemptModal articleId={stateUser.articleIdForResultModal} />
      )}
    </>
  );
};

export default UsersResults;
