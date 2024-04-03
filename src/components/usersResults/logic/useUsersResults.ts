import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUsers, userState } from '../../../app/userSlice';
import { mainState } from '../../../app/mainSlice';

export const useUsersResults = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector(userState);
  const stateMain = useAppSelector(mainState);
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
  };
  const onTitleChapterClick = (index: string) => {
    index === activeIndexChapter
      ? setActiveIndexChapter(null)
      : setActiveIndexChapter(index);
  };

  const findUserName = (userId: string) => {
    const user = stateUser.users.find((user) => user.id === userId);

    return user?.username;
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
  };
};
