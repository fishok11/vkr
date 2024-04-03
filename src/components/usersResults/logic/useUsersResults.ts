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

  const findUserName = (userId: string) => {
    const user = stateUser.users.find((user) => user.id === userId);

    return user ? user.username : '';
  };

  const handleShowResultModal = (
    result: Result,
    articleId: string | undefined,
  ) => {
    if (!articleId) return;
    dispatch(setArticleIdForResultModal(articleId));
    dispatch(showResultModal(result));
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
  };
};
