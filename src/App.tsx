import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ArticlesPage from "./pages/ArticlesPage";


export const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<MainPage />}/>
        <Route path={`/articles`} element={<ArticlesPage />}/>
      </Routes>
    </div>
  );
}

export default App;
