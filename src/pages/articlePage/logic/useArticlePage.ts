import {  mainState } from '../../../app/mainSlice';
import {  useAppSelector } from '../../../app/hooks';

export const useArticlePage = () => {
  const state = useAppSelector(mainState);

  return {
    state
  }
};
