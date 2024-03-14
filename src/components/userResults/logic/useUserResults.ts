import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getArticles,
  getChapters,
  getQuestions,
  mainState,
} from '../../../app/mainSlice';
import { Chapter, Result } from '../../../app/types';
import { getResults, userState } from '../../../app/userSlice';
import { useEffect, useState } from 'react';


export const useUserResults = ({ userId }: { userId: string }) => {
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const onTitleClick = (index: string) => {
    index === activeIndex ? setActiveIndex(null) : setActiveIndex(index);
  };

  const filterChapters = (chapters: Chapter[], results: Result[]) => {
    const resultArr: any = [];
    const userResults = results.filter((result) => result.userId == userId);

    chapters.forEach((chapter) => {
      userResults.forEach((result) => {
        if (result.chapterId == chapter.id) {
          resultArr.push(chapter);
        }
      });
    });

    const uniqueChapters = resultArr.filter(
      (item: Chapter, index: number) => resultArr.indexOf(item) === index,
    );

    return uniqueChapters;
  };

  useEffect(() => {
    dispatch(getResults());
    dispatch(getChapters());
    dispatch(getArticles(''));
    dispatch(getQuestions());
  }, []);

  return { stateMain, stateUser, activeIndex, onTitleClick, filterChapters };
};
