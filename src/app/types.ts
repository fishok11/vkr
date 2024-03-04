export type Article = {
  id: number;
  chapter: string;
  title: string;
  content: string;
};

export type Question = {
  id: number;
  articleId: number;
  question: string;
  correctAnswer: string;
  answers: string[];
};
