"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/entities/game/model/store";
import { useMemoryGame } from "@/features/play-memory/model/hooks";

type Props = {
    levelId: number;
};

export const MemoryGame = ({ levelId }: Props) => {
    const router = useRouter();

    const run = useGameStore((state) => state.currentRun);

    const {
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
    } = useMemoryGame({
        levelId,
        run,
    });

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
            <main className="h-[90vh] max-w-full p-8 text-center flex justify-center items-center">
                <div className={"p-4 flex flex-col gap-2 bg-blue-100 border border-blue-300 rounded-xl"}>
                    <h1 className="text-2xl font-bold">Поиск пар — уровень {run.currentLevel}</h1>
                    <p className="text-gray-500">Найди все {pairs.length} пар карточек.</p>

                    <button onClick={handleStart} className="rounded-lg bg-blue-600 px-6 py-3 text-white">
                        Начать игру
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="h-[90vh] max-w-full p-8 text-center flex justify-center items-center">
            <div className={"p-4 flex flex-col gap-2"}>
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

                <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
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
            </div>
        </main>
    );
};
