import { mainState } from './../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideResultModal, userState } from '../../app/userSlice';

export const useAttemptModal = (articleId: string | undefined) => {
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const questions = stateMain.questions.filter((question) => {
    if (question.articleId == articleId) {
      return question;
    }
  });

  const handleHideResultModal = () => {
    dispatch(hideResultModal());
  };

  return {
    stateUser,
    questions,
    handleHideResultModal,
  };
};
