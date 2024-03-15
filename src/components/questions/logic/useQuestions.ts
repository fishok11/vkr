import { resetResult, userState } from './../../../app/userSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getQuestions, mainState } from '../../../app/mainSlice';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { addResult, getResultOfTheArticle } from '../../../app/userSlice';
import { ResultToAdded } from '../../../app/types';

export const useQuestions = () => {
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cookies] = useCookies(['user']);
  const { articleId } = useParams();

  const handleAnswerSelection = (
    questionId: string,
    selectedAnswer: string,
  ) => {
    setSelectedAnswers((prevSelectedAnswers: { [key: string]: string }) => {
      const updatedSelection = { ...prevSelectedAnswers };
      updatedSelection[questionId] = selectedAnswer;
      return updatedSelection;
    });
  };

  const calculationAverageGradeArticle = (arеicleId: string | undefined) => {
    let cout = 0;

    const filterQuestionsByArticles = stateMain.questions.filter((question) => {
      if (question.articleId == arеicleId) {
        return question.articleId;
      }
    });

    const quantityQuestions = filterQuestionsByArticles.length;

    filterQuestionsByArticles.forEach((question) => {
      for (const key in selectedAnswers) {
        if (
          selectedAnswers[key] === question.correctAnswer &&
          key === question.id
        ) {
          cout++;
          return;
        }
      }
    });

    const averageGrade = cout / (quantityQuestions / 100);

    return averageGrade;
  };

  const result: ResultToAdded = {
    userId: cookies.user,
    articleId: articleId,
    chapterId: stateMain.article.chapterId,
    userAnswers: selectedAnswers,
    averageGrade: calculationAverageGradeArticle(articleId),
  };

  const handleAddResult = () => {
    const filterQuestionsByArticles = stateMain.questions.filter((question) => {
      if (question.articleId == articleId) {
        return question.articleId;
      }
    });
    const quantityQuestions = filterQuestionsByArticles.length;
    const quantityAnswers = Object.keys(selectedAnswers).length;

    if (quantityAnswers < quantityQuestions) {
      setErrorMessage(true);
      return;
    }
    dispatch(addResult(result));
    setShowResults(!showResults);
  };

  useEffect(() => {
    dispatch(resetResult());
    if (cookies.user === undefined) {
      dispatch(getQuestions());
    } else {
      dispatch(
        getResultOfTheArticle({ articleId: articleId, userId: cookies.user }),
      );
    }
  }, [showResults]);

  return {
    stateMain,
    stateUser,
    articleId,
    handleAnswerSelection,
    handleAddResult,
    errorMessage,
    cookies,
  };
};
