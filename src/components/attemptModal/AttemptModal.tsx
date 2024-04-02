import React, { FC } from 'react';
import styles from './AttemptModal.module.scss';
import { useAttemptModal } from './useAttemptModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

type AttemptModalProps = {
  articleId: string | undefined;
};

const AttemptModal: FC<AttemptModalProps> = ({ articleId }) => {
  const { stateUser, questions, handleHideResultModal } =
    useAttemptModal(articleId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.modalHead}>
          <h2 className={styles.modalHeadTitle}>Результаты</h2>
          <button
            className={styles.closeWindow}
            onClick={() => handleHideResultModal()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {questions.map((question) => (
          <div key={question.id}>
            <h3 className={styles.questionTitle}>
              {stateUser.resultForResultModal?.userAnswers[
                parseInt(question.id)
              ] === question.correctAnswer && (
                <FontAwesomeIcon icon={faCheck} className={styles.correctIco} />
              )}
              {stateUser.resultForResultModal?.userAnswers[
                parseInt(question.id)
              ] !== question.correctAnswer && (
                <FontAwesomeIcon
                  icon={faXmark}
                  className={styles.incorrectIco}
                />
              )}{' '}
              {question.question}
            </h3>
            <div>
              <p>
                <b>Правильный ответ:</b> {question.correctAnswer}
              </p>
              <p>
                <b>Ваш ответ:</b>{' '}
                {
                  stateUser.resultForResultModal?.userAnswers[
                    parseInt(question.id)
                  ]
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttemptModal;
