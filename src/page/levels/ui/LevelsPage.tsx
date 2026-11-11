"use client";

import { useGameStore } from "@/entities/game/model/store";
import { LevelMap, NotLevelMap } from "@/widgets/level-map";

export const LevelsPage = () => {
    const currentRun = useGameStore((state) => state.currentRun);
    const hasHydrated = useGameStore((state) => state._hasHydrated);

    if (!hasHydrated) {
        return <div>Загрузка...</div>;
    }

    if (!currentRun) {
        return <NotLevelMap />;
    }

    return <LevelMap />;
};
