import type { GameRun } from "./types";
import { LEVELS } from "@/entities/data/levels";
import { QUESTION_BANK } from "@/entities/data/questions";

export type LevelStatus = "completed" | "current" | "locked";

export function getLevelStatus(run: GameRun, levelPosition: number): LevelStatus {
    const levelId = run.levels[levelPosition - 1];

    if (run.progress[levelId]?.completed) {
        return "completed";
    }

    if (levelPosition === run.currentLevel) {
        return "current";
    }

    return "locked";
}

export function generateQuizQuestions() {
    const quizLevels = LEVELS.filter((level) => level.mode === "quiz");

    const shuffledQuestions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);

    const result: Record<number, string[]> = {};

    quizLevels.forEach((level, index) => {
        const start = index * 10;

        result[level.id] = shuffledQuestions.slice(start, start + 10).map((question) => question.id);
    });

    return result;
}
