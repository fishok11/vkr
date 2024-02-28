export type Article = {
  id: number | null;
  title: string;
  content: string;
};

export type Answer = {
  text: string;
  right: boolean;
};

export type Question = {
  id: number | null;
  articleId: number;
  question: string;
  answers: Answer[];
};
