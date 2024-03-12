export type Article = {
  id: string;
  chapterId: string;
  title: string;
  content: string;
};

export type Question = {
  id: string;
  articleId: string;
  question: string;
  correctAnswer: string;
  answers: string[];
};

export type Chapter = {
  id: string;
  chapter: string;
};

//===============================

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
};

export type UserLogIn = {
  username: string;
  password: string;
};

export type UserSignUp = {
  email: string;
  username: string;
  password: string;
};