import Link from "next/link";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-5xl font-bold">BrainCross</h1>

            <p className="text-gray-500">Испытай свою память, логику и скорость.</p>

            <Link href="/levels" className="rounded-xl bg-blue-600 px-8 py-4 text-white">
                Играть
            </Link>
        </main>
    );
}
