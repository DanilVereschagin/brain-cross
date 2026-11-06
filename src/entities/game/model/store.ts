import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GameRun, CompletedRun, GameState } from "./types";
import { LEVELS } from "@/entities/data/levels";
import { QUESTION_BANK } from "@/entities/data/questions";

const TOTAL_LEVELS = 20;

type GameActions = {
    startNewGame: () => void;
    completeLevel: (score: number) => void;
    finishGame: () => void;
};

type GameStore = GameState & GameActions;

function generateQuizQuestions() {
    const quizLevels = LEVELS.filter((level) => level.mode === "quiz");

    const shuffledQuestions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);

    const result: Record<number, string[]> = {};

    quizLevels.forEach((level, index) => {
        const start = index * 10;

        result[level.id] = shuffledQuestions.slice(start, start + 10).map((question) => question.id);
    });

    return result;
}

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            currentRun: null,
            leaderboard: [],
            startNewGame: () => {
                const run: GameRun = {
                    id: crypto.randomUUID(),
                    levels: Array.from({ length: TOTAL_LEVELS }, (_, index) => index + 1),
                    quizQuestionIds: generateQuizQuestions(),
                    usedQuestionIds: [],
                    currentLevel: 1,
                    totalScore: 0,
                    progress: {},
                    startedAt: new Date().toISOString(),
                };

                set({ currentRun: run });
            },
            completeLevel: (score) => {
                const run = get().currentRun;

                if (!run || score < 0) return;

                const levelId = run.levels[run.currentLevel - 1];

                if (run.progress[levelId]?.completed) return;

                const progress = {
                    ...run.progress,
                    [levelId]: {
                        completed: true,
                        score,
                    },
                };

                const totalScore = run.totalScore + score;

                set({
                    currentRun: {
                        ...run,
                        progress,
                        totalScore,
                        currentLevel: run.currentLevel < TOTAL_LEVELS ? run.currentLevel + 1 : run.currentLevel,
                    },
                });
            },
            finishGame: () => {
                const run = get().currentRun;

                if (!run) return;

                const allLevelsCompleted = run.levels.every((levelId) => run.progress[levelId]?.completed);

                if (!allLevelsCompleted) {
                    return;
                }

                const finishedAt = new Date();

                const completedRun: CompletedRun = {
                    id: run.id,
                    startedAt: run.startedAt,
                    finishedAt: finishedAt.toISOString(),
                    totalScore: run.totalScore,
                    totalTime: finishedAt.getTime() - new Date(run.startedAt).getTime(),
                };

                set((state) => ({
                    leaderboard: [...state.leaderboard, completedRun],
                    currentRun: null,
                }));
            },
        }),
        {
            name: "braincross-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
