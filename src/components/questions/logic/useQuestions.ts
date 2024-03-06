import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getQuestions, mainState } from "../../../app/mainSlice";

export const useQuestions = () => {

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

  useEffect(() => {
    dispatch(getQuestions());
  }, []);


  return {
    state,
    handleAnswerSelection,
    selectedAnswers,
    showResults,
    setShowResults,
  };
};
