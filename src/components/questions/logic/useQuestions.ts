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
  const [showResults, setShowResults] = useState(false);
  const [cookies] = useCookies(['user']);
  const { articleId } = useParams();

  const result: ResultToAdded = {
    userId: cookies.user,
    articleId: articleId,
    chapterId: stateMain.article.chapterId,
    userAnswers: selectedAnswers,
  };

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

  const handleAddResult = () => {
    dispatch(addResult(result));
    setShowResults(!showResults);
  };

  useEffect(() => {
    dispatch(resetResult());
    dispatch(getQuestions());
    dispatch(
      getResultOfTheArticle({ articleId: articleId, userId: cookies.user }),
    );
  }, [showResults]);

  return {
    stateMain,
    stateUser,
    articleId,
    handleAnswerSelection,
    handleAddResult,
  };
};
