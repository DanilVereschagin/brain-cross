import type { GameRun } from "./types";

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
