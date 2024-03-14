import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import ArticlesPage from './pages/articlesPage/ArticlesPage';
import Header from './components/header/Header';
import styles from './App.module.scss';
import ArticlePage from './pages/articlePage/ArticlePage';
import InfoPage from './pages/infoPage/InfoPage';
import Footer from './components/footer/Footer';
import Registration from './components/LoginAndRegistration/Registration';
import UserProfile from './pages/profile/Profile';
import AdminRegistration from './pages/adminRegistration/AdminRegistration';
import { Toaster } from 'react-hot-toast';

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
          <Route path={`/profile/:userId`} element={<UserProfile />} />
          <Route path={`/admin`} element={<AdminRegistration />} />
        </Routes>
      </div>
      <Footer />
      <Registration />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
