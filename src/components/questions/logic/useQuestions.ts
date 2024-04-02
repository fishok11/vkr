import {
  getResults,
  showResultModal,
  userState,
} from './../../../app/userSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getQuestions, mainState } from '../../../app/mainSlice';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { addResult } from '../../../app/userSlice';
import { Result, ResultToAdded } from '../../../app/types';

export const useQuestions = () => {
  const stateMain = useAppSelector(mainState);
  const stateUser = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [newAttempt, setNewAttempt] = useState(false);
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
    setNewAttempt(false);
  };

  const handleNewAttempt = () => {
    setNewAttempt(true);
  };

  const checkUserResults = (userId: string, articleId: string | undefined) => {
    if (!articleId) return;

    let userResult = false;

    stateUser.results.forEach((result) => {
      if (result.userId === userId && result.articleId === articleId) {
        userResult = true;
      }
    });

    return userResult;
  };

  const calcQuantityAttempt = (userId: string, articleId: string) => {
    let quantityAttempt = 0;

    stateUser.results.forEach((result) => {
      if (result.userId === userId && result.articleId === articleId) {
        quantityAttempt++;
      }
    });

    return quantityAttempt;
  };

  const handleShowResultModal = (result: Result) => {
    dispatch(showResultModal(result));
  };

  useEffect(() => {
    if (cookies.user) {
      dispatch(getResults());
    }

    dispatch(getQuestions());
  }, [showResults, newAttempt, cookies.user]);

  return {
    stateMain,
    stateUser,
    articleId,
    handleAnswerSelection,
    handleAddResult,
    newAttempt,
    handleNewAttempt,
    checkUserResults,
    calcQuantityAttempt,
    handleShowResultModal,
    errorMessage,
    cookies,
  };
};
