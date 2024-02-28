import React, { FC } from 'react';
import { useArticlePage } from './logic/useArticlePage';
import { Question } from '../../app/types';
import styles from './ArticlePage.module.scss';


const ArticlePage: FC = () => {
  const { state, articleId } = useArticlePage();

  if (state.isLoading === true) return null;

  return (
    <div className={styles.container}>
      <p>{state.article.content}</p>
      <div className={styles.questionsContainer}>
        <p className={styles.text}>Questions</p>
        {state.questions
          .filter(
            (question: Question) => question.articleId.toString() == articleId,
          )
          .map((question: Question) => (
            <div key={question.id}>
              <p className={styles.questionTitle}>{question.question}</p>
              <div className={styles.answersContainer}>
                {question.answers.map((answer) => (
                  <div key={answer.text} className={styles.answerContainer}>
                    <input
                      className={styles.input}
                      id={answer.text}
                      type={'radio'}
                      name={question.question}
                    />
                    <label htmlFor={answer.text} className={styles.label}>
                      {answer.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArticlePage;
