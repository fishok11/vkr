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

  useEffect(() => {
    dispatch(getResults());
    dispatch(getChapters());
    dispatch(getArticles(''));
    dispatch(getQuestions());
  }, []);
  
  const calculationAverageGradeArticle = (aricleId: string) => {
    let cout = 0;
    let quantityQuestions = 0;

    const filterUserResults = stateUser.results.filter((result) => {
      if (result.userId == userId) {
        return result.userId;
      }
    });

    const filterQuestionsByArticles = stateMain.questions.filter((question) => {
      if (question.articleId == aricleId) {
        return question.articleId;
      }
    });

    filterUserResults.forEach((result) => {
      filterQuestionsByArticles.forEach((question) => {
        for (const key in result.userAnswers) {
          if (
            result.userAnswers[key] === question.correctAnswer &&
            key === question.id
          ) {
            cout++;
            return;
          }
        }
      });
      const userAnswersKeys = Object.keys(result.userAnswers);
      quantityQuestions = userAnswersKeys.length;
    });

    console.log(cout, quantityQuestions);

    const averageGrade = cout / (quantityQuestions / 100);

    console.log(averageGrade);

    return averageGrade;
  };

  return {
    stateMain,
    stateUser,
    activeIndexArticle,
    onTitleArticleClick,
    activeIndexChapter,
    onTitleChapterClick,
    filterChaptersByUserResults,
    calculationAverageGradeArticle,
  };
};
