import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import Header from './components/header/Header';
import styles from './App.module.scss';
import ArticlePage from './pages/articlePage/ArticlePage';
import InfoPage from './pages/infoPage/InfoPage';
import Footer from './components/footer/Footer';
import LogIn from './components/LoginAndRegistration/LogIn';
import SignUp from './components/LoginAndRegistration/SingUp';

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={`/articles`} element={<ArticlesPage />} />
          <Route path={`/article/:articleId`} element={<ArticlePage />} />
          <Route path={`/about`} element={<InfoPage />} />
        </Routes>
      </div>
      <Footer />
      {/* <LogIn /> */}
      <SignUp />
    </>
  );
}

export default App;
