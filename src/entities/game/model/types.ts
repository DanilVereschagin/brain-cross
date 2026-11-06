import type { GameMode } from "@/entities/level/model/types";

export type GameRun = {
    id: string;
    levels: number[];
    quizQuestionIds: Record<number, string[]>;
    usedQuestionIds: string[];
    currentLevel: number;
    totalScore: number;
    progress: Record<
        number,
        {
            completed: boolean;
            score: number;
        }
    >;
    startedAt: string;
};

export type CompletedRun = {
    id: string;
    startedAt: string;
    finishedAt: string;
    totalScore: number;
    totalTime: number;
};

export type GameState = {
    currentRun: GameRun | null;
    leaderboard: CompletedRun[];
};
