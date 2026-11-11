import { useGameStore } from "@/entities/game/model/store";

export const NotLevelMap = () => {
    const startNewGame = useGameStore((state) => state.startNewGame);

    return (
        <div className={"h-[90vh] flex justify-center items-center"}>
            <div className="p-4 w-max h-max flex flex-col items-center gap-4 bg-blue-100 border border-blue-300 rounded-xl">
                <h1 className="text-3xl font-bold">BrainCross</h1>

                <p>У тебя пока нет активной игры.</p>

                <button onClick={startNewGame} className="rounded-xl bg-blue-600 px-6 py-3 text-white">
                    Начать игру
                </button>
            </div>
        </div>
    );
};
