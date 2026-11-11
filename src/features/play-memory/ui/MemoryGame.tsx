"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MEMORY_LEVELS } from "@/entities/data/memory";
import { useGameStore } from "@/entities/game/model/store";

type Props = {
    levelId: number;
};

type MemoryCard = {
    id: string;
    pairId: string;
    symbol: string;
    name: string;
};

function shuffleCards<T>(items: T[]): T[] {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

export const MemoryGame = ({ levelId }: Props) => {
    const router = useRouter();

    const run = useGameStore((state) => state.currentRun);
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

    // Запуск игры
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

    if (!run) {
        return <div className="p-8">Сначала начни новую игру.</div>;
    }

    if (!isAccessible) {
        return (
            <div className="p-8">
                <p>Этот уровень сейчас недоступен.</p>

                <button
                    onClick={() => router.push("/levels")}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                    Вернуться к уровням
                </button>
            </div>
        );
    }

    if (pairs.length === 0) {
        return <div className="p-8">Данные уровня не найдены.</div>;
    }

    if (cards.length === 0) {
        return (
            <main className="mx-auto max-w-2xl p-8 text-center">
                <h1 className="mb-4 text-2xl font-bold">Поиск пар — уровень {run.currentLevel}</h1>

                <p className="mb-6 text-gray-500">Найди все {pairs.length} пар карточек.</p>

                <button onClick={handleStart} className="rounded-lg bg-blue-600 px-6 py-3 text-white">
                    Начать игру
                </button>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-3xl p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Поиск пар — уровень {run.currentLevel}</h1>

                <div className="flex gap-4 text-sm">
                    <span>Время: {elapsed} сек.</span>
                    <span>Попытки: {attempts}</span>
                    <span>
                        Пары: {matchedIds.length}/{pairs.length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                {cards.map((card) => {
                    const isSelected = selectedIds.includes(card.id);
                    const isMatched = matchedIds.includes(card.pairId);
                    const isOpen = isSelected || isMatched;

                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            disabled={isOpen || isLocked || finished}
                            className={`
                                flex aspect-square flex-col items-center
                                justify-center rounded-xl border-2 p-2
                                transition-all
                                ${
                                    isOpen
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 bg-white hover:border-blue-400"
                                }
                                ${isMatched ? "border-green-500 bg-green-50" : ""}
                            `}
                        >
                            {isOpen ? (
                                <>
                                    <span className="text-3xl">{card.symbol}</span>
                                    <span className="mt-1 text-xs text-gray-600">{card.name}</span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-gray-400">?</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all"

                    style={{
                        width: `${(matchedIds.length / pairs.length) * 100}%`,
                    }}
                />
            </div>
        </main>
    );
};
