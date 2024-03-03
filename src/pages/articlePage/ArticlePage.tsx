import React, { FC } from 'react';
import { useArticlePage } from './logic/useArticlePage';
import { Question } from '../../app/types';
import styles from './ArticlePage.module.scss';
import Button from '../../UI/button/Button';

const ArticlePage: FC = () => {
  const {
    state,
    articleId,
    handleAnswerSelection,
    selectedAnswers,
  } = useArticlePage();

  return (
    <div className={styles.container}>
      <p>{state.article.content}</p>
      <div className={styles.questionsContainer}>
        <p className={styles.text}>Вопросы</p>
        {state.questions
          .filter(
            (question: Question) => question.articleId.toString() === articleId,
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
                        handleAnswerSelection(answer, question.id)
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
        {/* <Button text={'OK'} onClick={() => handleResults()} /> */}

      </div>
    </div>
  );
};

export default ArticlePage;
