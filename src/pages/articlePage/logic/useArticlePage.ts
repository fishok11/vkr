import {  mainState } from '../../../app/mainSlice';
import {  useAppSelector } from '../../../app/hooks';

export const useArticlePage = () => {
  const stateMain = useAppSelector(mainState);

  return {
    stateMain,
  };
};
