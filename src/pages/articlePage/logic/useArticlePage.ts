import { useEffect, useState } from 'react';
import { getArticle, getQuestions, mainState } from '../../../app/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router';

export const useArticlePage = () => {
  const { articleId } = useParams();
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelection = (
    selectedAnswer: string,
    questionId: number,
  ) => {
    setSelectedAnswers((prevSelectedAnswers: { [key: number]: string }) => {
      const updatedSelection = { ...prevSelectedAnswers };
      updatedSelection[questionId] = selectedAnswer;
      return updatedSelection;
    });
  };

  const handleResults = () => {
    setShowResults(true);
  };

  useEffect(() => {
    if (articleId !== undefined) {
      dispatch(getArticle(articleId));
    }
    dispatch(getQuestions());
  }, []);

  return {
    state,
    articleId,
    handleAnswerSelection,
    selectedAnswers,
    showResults,
    handleResults,
  };
};
