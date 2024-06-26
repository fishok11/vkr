import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { mainState } from '../../../app/mainSlice';
import { Chapter, Result } from '../../../app/types';
import {
  setArticleIdForResultModal,
  showResultModal,
  userState,
} from '../../../app/userSlice';
import { useState } from 'react';

export const useUserResults = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const [cookies] = useCookies(['user']);
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
  const handleShowResultModal = (
    result: Result,
    articleId: string | undefined,
  ) => {
    if (!articleId) return;
    dispatch(setArticleIdForResultModal(articleId));
    dispatch(showResultModal(result));
  };

  const filterChaptersByUserResults = (
    chapters: Chapter[],
    results: Result[],
  ) => {
    const resultArr: Chapter[] = [];
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

  // const calculationAverageGradeChapter = (chapterId: string) => {
  //   const filterResultsByChapter = stateUser.results.filter((result) => {
  //     if (result.chapterId == chapterId && result.userId === userId) {
  //       return result;
  //     }
  //   });

  //   const averageGradeChapter = filterResultsByChapter.reduce(
  //     (acc, currentResult) => acc + currentResult.averageGrade,
  //     0,
  //   );

  //   return averageGradeChapter / filterResultsByChapter.length;
  // };

  return {
    stateMain,
    stateUser,
    cookies,
    activeIndexArticle,
    onTitleArticleClick,
    activeIndexChapter,
    onTitleChapterClick,
    filterChaptersByUserResults,
    // calculationAverageGradeChapter,
    handleShowResultModal,
  };
};
