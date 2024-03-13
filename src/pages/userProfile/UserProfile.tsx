import React, { FC } from 'react';
import styles from './UserProfile.module.scss';
import { useUserPrtofle } from './logic/useUserProfile';

const UserProfile: FC = () => {
  const { stateMain, stateUser, activeIndex, onTitleClick } = useUserPrtofle();

  return (
    <div className={styles.container}>
      <div className={styles.resultsContainer}>
        {stateUser.userResults.map((result) => (
          <div className={styles.accordionContainer} key={result.id}>
            {stateMain.articles
              .filter((article) => article.id == result.articleId)
              .map((article) => (
                <h2
                  key={article.id}
                  className={styles.articleTitle}
                  onClick={() => onTitleClick(article.id)}
                >
                  {article.title}
                </h2>
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
                        {question.question}
                      </h3>
                      <div>
                        <p>
                          <b>Правильный ответ: </b>
                          {question.correctAnswer}
                        </p>
                        <p>
                          <b>Ваш ответ: </b>
                          {result.userAnswers[question.id]}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
