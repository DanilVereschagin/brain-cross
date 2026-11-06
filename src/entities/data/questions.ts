import type { QuizQuestion } from "@/entities/level/model/types";

export const QUESTION_BANK: QuizQuestion[] = [
    {
        id: "q1",
        question: "Сколько планет в Солнечной системе?",
        answers: ["7", "8", "9", "10"],
        correctAnswer: 1,
        difficulty: 1,
    },
    {
        id: "q2",
        question: "Какой океан самый большой?",
        answers: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
        correctAnswer: 2,
        difficulty: 1,
    },
    {
        id: "q3",
        question: "Сколько будет 12 × 8?",
        answers: ["86", "96", "108", "88"],
        correctAnswer: 1,
        difficulty: 1,
    },
    {
        id: "q4",
        question: "Как называется столица Франции?",
        answers: ["Рим", "Берлин", "Париж", "Мадрид"],
        correctAnswer: 2,
        difficulty: 1,
    },
    {
        id: "q5",
        question: "Какой газ необходим человеку для дыхания?",
        answers: ["Азот", "Кислород", "Водород", "Гелий"],
        correctAnswer: 1,
        difficulty: 1,
    },
    {
        id: "q6",
        question: "Сколько сторон у шестиугольника?",
        answers: ["5", "6", "7", "8"],
        correctAnswer: 1,
        difficulty: 1,
    },
    {
        id: "q7",
        question: "Как называется самая высокая гора мира?",
        answers: ["Эльбрус", "Килиманджаро", "Эверест", "Монблан"],
        correctAnswer: 2,
        difficulty: 1,
    },
    {
        id: "q8",
        question: "Какой металл обозначается символом Fe?",
        answers: ["Медь", "Железо", "Серебро", "Золото"],
        correctAnswer: 1,
        difficulty: 1,
    },
    {
        id: "q9",
        question: "Сколько минут в одном часе?",
        answers: ["30", "45", "60", "90"],
        correctAnswer: 2,
        difficulty: 1,
    },
    {
        id: "q10",
        question: "Какое животное является самым крупным на Земле?",
        answers: ["Африканский слон", "Синий кит", "Жираф", "Белый медведь"],
        correctAnswer: 1,
        difficulty: 1,
    },
];
