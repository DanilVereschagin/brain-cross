import { useEffect, useState } from "react";
import { GameRun } from "@/entities/game/model/types";
import { QUESTION_BANK } from "@/entities/data/questions";
import { useRouter } from "next/navigation";

type Props = {
    run: GameRun | null;
    completeLevel: (score: number) => void;
    levelId: number;
};

export const useQuizGame = ({ run, completeLevel, levelId }: Props) => {
    const router = useRouter();

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

    const currentPosition = run?.currentLevel;
    const currentLevelId = currentPosition ? run?.levels[currentPosition - 1] : undefined;

    const questionIds = run?.quizQuestionIds[levelId] ?? [];

    const questions = questionIds
        .map((id) => QUESTION_BANK.find((question) => question.id === id))
        .filter((question) => question !== undefined);

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

    return {
        questionIndex,
        correctAnswers,
        elapsed,
        finished,
        currentPosition,
        currentLevelId,
        questions,
        question,
        handleAnswer,
    };
};
