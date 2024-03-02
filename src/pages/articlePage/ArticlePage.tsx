import React, { FC, useState } from 'react';
import { useArticlePage } from './logic/useArticlePage';
import { Question } from '../../app/types';
import styles from './ArticlePage.module.scss';
import { shuffleAnswers } from '../../helpers/shuffleAnswers';

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
                {shuffleAnswers(question).map((answer: string) => (
                  <div key={answer} className={styles.answerContainer}>
                    <input
                      id={answer}
                      type={'radio'}
                      name={question.question}
                      className={styles.input}
                      value={answer}
                      onChange={() =>
                        console.log(answer, answer === question.correctAnswer)
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

        <div>
          {state.questions
            .filter(
              (question: Question) =>
                question.articleId.toString() == articleId,
            )
            .map((question: Question) => (
              <div key={question.id}>
                <p className={styles.questionTitle}>{question.question}</p>
                <p>Correct answer: {question.correctAnswer}</p>
                <p>Your answer:</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
