import { QuizGame } from "@/features/play-quiz";
import { notFound } from "next/navigation";
import { LEVELS } from "@/entities/data/levels";
import { MemoryGame } from "@/features/play-memory";

interface Props {
    params: Promise<{
        levelId: string;
    }>;
}

export const LevelPage = async ({ params }: Props) => {
    const { levelId } = await params;

    if (!levelId) {
        notFound();
    }

    const level = LEVELS.find((item) => item.id === Number(levelId));

    if (!level) {
        notFound();
    }

    switch (level.mode) {
        case "quiz":
            return <QuizGame levelId={Number(levelId)} />;

        case "crossword":
            return <MemoryGame levelId={Number(levelId)} />;

        case "memory":
            return <div>Поиск пар пока не реализован.</div>;

        case "riddle":
            return <div>Загадки пока не реализованы.</div>;

        default:
            return <div>Неизвестный режим.</div>;
    }
};
