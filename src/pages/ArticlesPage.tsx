import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getArticles, mainState } from "../app/mainSlice";
import LinkArticle from "../UI/linkArticle/LinkArticle";

const ArticlesPage = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [])

  return (
    <>
      {state.articles.map((item) => (
        <LinkArticle key={item.id} to={item.title} text={item.title}/>
      ))}
    </>
  )
}

export default ArticlesPage;