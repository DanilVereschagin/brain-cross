export type GameMode = "crossword" | "memory" | "quiz" | "riddle";

export type Level = {
    id: number;
    mode: GameMode;
    title: string;
    description: string;
};

export type LevelProgress = {
    completed: boolean;
    score: number;
};

export type QuizQuestion = {
    id: string;
    question: string;
    answers: string[];
    correctAnswer: number;
    difficulty: 1 | 2 | 3;
};
