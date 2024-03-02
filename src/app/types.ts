export type Article = {
  id: number;
  title: string;
  content: string;
};

export type Question = {
  id: number;
  articleId: number;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};
