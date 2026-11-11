"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/entities/game/model/store";
import { LevelMap, NotLevelMap } from "@/widgets/level-map";

export const LevelsPage = () => {
    const currentRun = useGameStore((state) => state.currentRun);

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return <div>Загрузка...</div>;
    }

    if (!currentRun) {
        return <NotLevelMap />
    }

    return <LevelMap />
}