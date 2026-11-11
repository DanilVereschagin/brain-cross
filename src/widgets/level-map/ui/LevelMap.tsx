"use client";

import { useRouter } from "next/navigation";
import cn from "classnames";
import { LEVELS } from "@/entities/data/levels";
import { useGameStore } from "@/entities/game/model/store";
import { getLevelStatus } from "@/entities/game/model/game-utils";
import { LockKeyhole, Check, Play } from "lucide-react";

export const LevelMap = () => {
    const router = useRouter();

    const currentRun = useGameStore((state) => state.currentRun);

    if (!currentRun) return null;

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">BrainCross</h1>

                <p className="mt-2 text-gray-500">Пройди все 20 уровней последовательно.</p>

                <p className="mt-2 font-medium">Очки: {currentRun.totalScore}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {currentRun.levels.map((levelId, index) => {
                    const level = LEVELS.find((item) => item.id === levelId);

                    if (!level) return null;

                    const position = index + 1;

                    const status = getLevelStatus(currentRun, position);

                    const isCurrent = status === "current";
                    const isCompleted = status === "completed";

                    const additionalStyles = isCurrent
                        ? "border-blue-500 bg-blue-50 hover:bg-blue-100"
                        : isCompleted
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 bg-gray-100 opacity-60";

                    const message = isCompleted
                        ? `Пройдено: ${currentRun.progress[levelId]?.score} очков`
                        : isCurrent
                          ? "Доступен"
                          : "Заблокирован";

                    return (
                        <button
                            key={levelId}
                            disabled={!isCurrent}
                            onClick={() => {
                                router.push(`/game/${levelId}`);
                            }}
                            className={cn(
                                "flex flex-col items-center gap-3 rounded-xl border p-5 transition",
                                additionalStyles,
                            )}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                                {isCompleted ? (
                                    <Check className="text-green-600" />
                                ) : isCurrent ? (
                                    <Play className="text-blue-600" />
                                ) : (
                                    <LockKeyhole className="text-gray-400" />
                                )}
                            </div>

                            <span className="font-bold">Уровень {position}</span>

                            <span className="text-center text-sm">{level.title}</span>

                            <span className="text-xs text-gray-500">{message}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
