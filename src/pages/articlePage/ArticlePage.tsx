import React, { FC } from 'react';
import { useArticlePage } from './logic/useArticlePage';
import { Question } from '../../app/types';
import styles from './ArticlePage.module.scss';
import Button from '../../UI/button/Button';
import { Link } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';

const ArticlePage: FC = () => {
  const {
    state,
    articleId,
    handleAnswerSelection,
    selectedAnswers,
    showResults,
    setShowResults,
    articlesFilterByChapter,
    prevArticleId,
    nextArticleId,
  } = useArticlePage();

  return (
    <div className={styles.container}>
      <h1>{state.article.title}</h1>
      <p>{HTMLReactParser(state.article.content)}</p>
      <div className={styles.questionsContainer}>
        {!showResults && (
          <>
            <p className={styles.text}>Вопросы</p>
            {state.questions
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
            <div className={styles.buttonContainer}>
              <Button
                text={'Посмотреть результаты'}
                onClick={() => setShowResults(true)}
              />
            </div>
          </>
        )}

        {showResults && (
          <>
            <p className={styles.text}>Результаты</p>
            {state.questions
              .filter(
                (question: Question) =>
                  question.articleId.toString() == articleId,
              )
              .map((question: Question) => (
                <div key={question.id}>
                  <p className={styles.questionTitle}>{question.question}</p>
                  <p>Правильный ответ: {question.correctAnswer}</p>
                  <p>Ваш ответ: {selectedAnswers[question.id]}</p>
                </div>
              ))}
          </>
        )}
      </div>
      {articlesFilterByChapter && (
        <div className={styles.linksContainer}>
          {prevArticleId && (
            <Link
              to={`/article/${prevArticleId}`}
              className={styles.prevLink}
              onClick={() => setShowResults(false)}
            >
              Назад
            </Link>
          )}
          {nextArticleId && (
            <Link
              to={`/article/${nextArticleId}`}
              className={styles.nextLink}
              onClick={() => setShowResults(false)}
            >
              Далее
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
