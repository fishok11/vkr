import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getQuestions, mainState } from '../../../app/mainSlice';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { addResult } from '../../../app/userSlice';
import { Result } from '../../../app/types';

export const useQuestions = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [cookies] = useCookies(['user']);
  const { articleId } = useParams();

  const result: Result = {
    userId: cookies.user,
    articleId: articleId,
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
    // setShowResults(true);
  }

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  return {
    state,
    articleId,
    handleAnswerSelection,
    selectedAnswers,
    showResults,
    handleAddResult,
  };
};
