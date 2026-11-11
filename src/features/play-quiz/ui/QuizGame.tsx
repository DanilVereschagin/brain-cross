"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTION_BANK } from "@/entities/data/questions";
import { useGameStore } from "@/entities/game/model/store";

type Props = {
    levelId: number;
};

export const QuizGame = ({ levelId }: Props) => {
    const router = useRouter();

    const run = useGameStore((state) => state.currentRun);
    const completeLevel = useGameStore((state) => state.completeLevel);
    const hasHydrated = useGameStore((state) => state._hasHydrated);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [startedAt] = useState(() => performance.now());
    const [elapsed, setElapsed] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Math.floor((performance.now() - startedAt) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    if (!hasHydrated) {
        return <div>Загрузка...</div>;
    }

    if (!run) {
        return <div>Сначала начни новую игру.</div>;
    }

    const currentPosition = run.currentLevel;
    const currentLevelId = run.levels[currentPosition - 1];

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

    const questionIds = run.quizQuestionIds[levelId] ?? [];

    const questions = questionIds
        .map((id) => QUESTION_BANK.find((question) => question.id === id))
        .filter((question) => question !== undefined);

    if (questions.length === 0) {
        return <div>Для этого уровня пока нет вопросов.</div>;
    }

    const question = questions[questionIndex];

    const handleAnswer = (answerIndex: number) => {
        if (finished) return;

        const isCorrect = answerIndex === question.correctAnswer;

        const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);

        setCorrectAnswers(newCorrectAnswers);

        if (questionIndex + 1 < questions.length) {
            setQuestionIndex((index) => index + 1);
            return;
        }

        setFinished(true);

        const passed = newCorrectAnswers >= 5;

        if (passed) {
            const score = newCorrectAnswers * 100 + Math.max(0, 200 - elapsed);

            completeLevel(score);

            router.push("/levels");
        }
    };

    return (
        <main className="mx-auto max-w-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Квиз — уровень {currentPosition}</h1>

                <span className="rounded-lg bg-gray-100 px-3 py-2">{elapsed} сек.</span>
            </div>

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full bg-blue-600 transition-all"
                    style={{
                        width: `${((questionIndex + 1) / questions.length) * 100}%`,
                    }}
                />
            </div>

            <p className="mb-2 text-sm text-gray-500">
                Вопрос {questionIndex + 1} из {questions.length}
            </p>

            <h2 className="mb-6 text-xl font-semibold">{question.question}</h2>

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
        </main>
    );
};
