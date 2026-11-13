import { useEffect, useState } from "react";
import { MEMORY_LEVELS } from "@/entities/data/memory";
import { router } from "next/client";
import { useGameStore } from "@/entities/game/model/store";
import { GameRun } from "@/entities/game/model/types";
import { shuffleCards } from "@/features/play-memory/model/lib";

type Props = {
    levelId: number;
    run: GameRun | null;
};

type MemoryCard = {
    id: string;
    pairId: string;
    symbol: string;
    name: string;
};

export const useMemoryGame = ({ levelId, run }: Props) => {
    const completeLevel = useGameStore((state) => state.completeLevel);

    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [matchedIds, setMatchedIds] = useState<string[]>([]);

    const [attempts, setAttempts] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [startedAt, setStartedAt] = useState<number | null>(null);

    const [isLocked, setIsLocked] = useState(false);
    const [finished, setFinished] = useState(false);

    const pairs = MEMORY_LEVELS[levelId] ?? [];
    const currentLevelId = run ? run.levels[run.currentLevel - 1] : null;
    const isAccessible = currentLevelId === levelId;

    const handleStart = () => {
        const deck = pairs.flatMap((pair) => [
            {
                id: `${pair.id}-1`,
                pairId: pair.id,
                symbol: pair.symbol,
                name: pair.name,
            },
            {
                id: `${pair.id}-2`,
                pairId: pair.id,
                symbol: pair.symbol,
                name: pair.name,
            },
        ]);

        setCards(shuffleCards(deck));
        setStartedAt(Date.now());
    };

    // Таймер
    useEffect(() => {
        if (startedAt === null || finished) return;

        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startedAt) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startedAt, finished]);

    // Открытие карточки и проверка пары
    const handleCardClick = (card: MemoryCard) => {
        if (isLocked || finished || selectedIds.includes(card.id) || matchedIds.includes(card.pairId)) {
            return;
        }

        // Первая карточка
        if (selectedIds.length === 0) {
            setSelectedIds([card.id]);
            return;
        }

        // Вторая карточка
        const firstCard = cards.find((item) => item.id === selectedIds[0]);

        if (!firstCard) return;

        setAttempts((prev) => prev + 1);

        // Совпадение
        if (firstCard.pairId === card.pairId) {
            const newMatchedIds = [...matchedIds, card.pairId];

            setMatchedIds(newMatchedIds);
            setSelectedIds([]);

            // Все пары найдены
            if (newMatchedIds.length === pairs.length) {
                const finalTime = elapsed;
                const normalTime = pairs.length * 5;
                const timeBonus = Math.floor(300 * Math.max(0, 1 - finalTime / (2 * normalTime)));
                const score = pairs.length * 100 + timeBonus;

                setElapsed(finalTime);
                setFinished(true);

                completeLevel(score);
                router.push("/levels");
            }

            return;
        }

        // Карточки не совпали
        setIsLocked(true);
        setSelectedIds((prev) => [...prev, card.id]);

        setTimeout(() => {
            setSelectedIds([]);

            setIsLocked(false);
        }, 900);
    };

    return {
        isAccessible,
        pairs,
        cards,
        handleStart,
        handleCardClick,
        elapsed,
        attempts,
        matchedIds,
        selectedIds,
        isLocked,
        finished,
    };
};
