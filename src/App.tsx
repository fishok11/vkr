import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ArticlesPage from "./pages/ArticlesPage";
import Header from './components/Header/Header';
import styles from './App.module.scss';

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Routes>
          <Route index element={<MainPage />}/>
          <Route path={`/articles`} element={<ArticlesPage />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
