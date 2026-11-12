"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/entities/game/model/store";
import { useQuizGame } from "@/features/play-quiz/model/hooks";

type Props = {
    levelId: number;
};

export const QuizGame = ({ levelId }: Props) => {
    const router = useRouter();

    const run = useGameStore((state) => state.currentRun);
    const completeLevel = useGameStore((state) => state.completeLevel);
    const hasHydrated = useGameStore((state) => state._hasHydrated);

    const {
        questionIndex,
        correctAnswers,
        elapsed,
        finished,
        currentPosition,
        currentLevelId,
        questions,
        question,
        handleAnswer,
    } = useQuizGame({ run, completeLevel, levelId });

    if (!hasHydrated) {
        return <div>Загрузка...</div>;
    }

    if (!run) {
        return <div>Сначала начни новую игру.</div>;
    }

    if (currentLevelId !== levelId) {
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

    if (questions.length === 0) {
        return <div>Для этого уровня пока нет вопросов.</div>;
    }

    return (
        <main className="w-full h-[90vh] flex justify-center items-center p-6">
            <div className={"w-[50%] flex flex-col gap-4"}>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Квиз — уровень {currentPosition}</h1>

                    <span className="rounded-lg bg-gray-100 px-3 py-2">{elapsed} сек.</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full bg-blue-600 transition-all"
                        style={{
                            width: `${((questionIndex + 1) / questions.length) * 100}%`,
                        }}
                    />
                </div>

                <p className="text-sm text-gray-500">
                    Вопрос {questionIndex + 1} из {questions.length}
                </p>

                <h2 className="text-xl font-semibold">{question.question}</h2>

                <div className="grid gap-3">
                    {question.answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={finished}
                            className="rounded-xl border p-4 text-left transition hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50"
                        >
                            {answer}
                        </button>
                    ))}
                </div>

                {finished && correctAnswers < 5 && (
                    <div className="mt-6 rounded-xl bg-red-50 p-4">
                        <p className="font-semibold text-red-600">Квиз не пройден</p>
                        <p>
                            Правильных ответов: {correctAnswers} из {questions.length}
                        </p>

                        <button
                            onClick={() => router.push("/levels")}
                            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            Вернуться к уровням
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};
