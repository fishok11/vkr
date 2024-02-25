import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getArticles, mainState } from "../app/mainSlice";

const ArticlesPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles);
  }, [])
  return (
    <></>
  )
}

export default ArticlesPage;