export type MemoryPair = {
    id: string;
    symbol: string;
    name: string;
};

export const MEMORY_LEVELS: Record<number, MemoryPair[]> = {
    3: [
        { id: "cat", symbol: "🐱", name: "Кот" },
        { id: "dog", symbol: "🐶", name: "Собака" },
        { id: "fox", symbol: "🦊", name: "Лиса" },
        { id: "bear", symbol: "🐻", name: "Медведь" },
    ],

    5: [
        { id: "apple", symbol: "🍎", name: "Яблоко" },
        { id: "banana", symbol: "🍌", name: "Банан" },
        { id: "cherry", symbol: "🍒", name: "Вишня" },
        { id: "grape", symbol: "🍇", name: "Виноград" },
        { id: "lemon", symbol: "🍋", name: "Лимон" },
    ],

    8: [
        { id: "car", symbol: "🚗", name: "Машина" },
        { id: "bus", symbol: "🚌", name: "Автобус" },
        { id: "train", symbol: "🚆", name: "Поезд" },
        { id: "plane", symbol: "✈️", name: "Самолёт" },
        { id: "ship", symbol: "🚢", name: "Корабль" },
        { id: "bike", symbol: "🚲", name: "Велосипед" },
    ],

    10: [
        { id: "sun", symbol: "☀️", name: "Солнце" },
        { id: "moon", symbol: "🌙", name: "Луна" },
        { id: "star", symbol: "⭐", name: "Звезда" },
        { id: "cloud", symbol: "☁️", name: "Облако" },
        { id: "rain", symbol: "🌧️", name: "Дождь" },
        { id: "snow", symbol: "❄️", name: "Снег" },
        { id: "rainbow", symbol: "🌈", name: "Радуга" },
    ],

    14: [
        { id: "book", symbol: "📚", name: "Книги" },
        { id: "pen", symbol: "🖊️", name: "Ручка" },
        { id: "pencil", symbol: "✏️", name: "Карандаш" },
        { id: "ruler", symbol: "📏", name: "Линейка" },
        { id: "bag", symbol: "🎒", name: "Рюкзак" },
        { id: "globe", symbol: "🌍", name: "Глобус" },
        { id: "bell", symbol: "🔔", name: "Звонок" },
        { id: "calculator", symbol: "🧮", name: "Счёты" },
    ],

    17: [
        { id: "football", symbol: "⚽", name: "Футбол" },
        { id: "basketball", symbol: "🏀", name: "Баскетбол" },
        { id: "tennis", symbol: "🎾", name: "Теннис" },
        { id: "volleyball", symbol: "🏐", name: "Волейбол" },
        { id: "boxing", symbol: "🥊", name: "Бокс" },
        { id: "hockey", symbol: "🏒", name: "Хоккей" },
        { id: "golf", symbol: "⛳", name: "Гольф" },
        { id: "bowling", symbol: "🎳", name: "Боулинг" },
        { id: "swimming", symbol: "🏊", name: "Плавание" },
        { id: "cycling", symbol: "🚴", name: "Велоспорт" },
    ],
};
