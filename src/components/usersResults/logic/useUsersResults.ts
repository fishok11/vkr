import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getUsers,
  setArticleIdForResultModal,
  showResultModal,
  userState,
} from '../../../app/userSlice';
import { mainState } from '../../../app/mainSlice';
import { Result } from '../../../app/types';

export const useUsersResults = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector(userState);
  const stateMain = useAppSelector(mainState);
  const [usernameToSearch, setUsernameToSearch] = useState('');
  const [activeIndexArticle, setActiveIndexArticle] = useState<string | null>(
    null,
  );
  const [activeIndexChapter, setActiveIndexChapter] = useState<string | null>(
    null,
  );
  const onTitleArticleClick = (index: string) => {
    index === activeIndexArticle
      ? setActiveIndexArticle(null)
      : setActiveIndexArticle(index);

    setUsernameToSearch('');
  };
  const onTitleChapterClick = (index: string) => {
    index === activeIndexChapter
      ? setActiveIndexChapter(null)
      : setActiveIndexChapter(index);

    setUsernameToSearch('');
  };
  const handleShowResultModal = (
    result: Result,
    articleId: string | undefined,
  ) => {
    if (!articleId) return;
    dispatch(setArticleIdForResultModal(articleId));
    dispatch(showResultModal(result));
  };

  const findUserName = (userId: string) => {
    const user = stateUser.users.find((user) => user.id === userId);

    return user ? user.username : '';
  };

  const setAttempt = (
    props: Result 
  ) => {
    if (!props.articleId) return '';

    const userArticleResults: Result[] = stateUser.results.filter(
      (result) =>
        result.userId === props.userId && result.articleId === props.articleId,
    );

    let attempt;

    userArticleResults.forEach((result, index) => {
      if (
        result.userId == props.userId &&
        result.articleId == props.articleId &&
        result.userAnswers == props.userAnswers
      ) {
        attempt = index + 1;
        return;
      }
    });

    return attempt;
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return {
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
  };
};
