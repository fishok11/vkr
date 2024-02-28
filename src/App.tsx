import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import Header from './components/Header/Header';
import styles from './App.module.scss';
import ArticlePage from './pages/articlePage/ArticlePage';

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path={`/articles`} element={<ArticlesPage />} />
          <Route path={`/article/:articleId`} element={<ArticlePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
