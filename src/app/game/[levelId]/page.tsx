import { LEVELS } from "@/entities/data/levels";
import { Suspense } from "react";
import { LevelPage } from "@/pages/game";

interface PageProps {
    params: Promise<{
        levelId: string;
    }>;
}

export const generateStaticParams = () => {
    return LEVELS.map((level) => ({
        levelId: String(level.id),
    }));
};

const Page = async ({ params }: PageProps) => {
    return (
        <Suspense fallback={<div>Загрузка игры...</div>}>
            <LevelPage params={params} />
        </Suspense>
    );
};

export default Page;
