export function getWeekDays(date: Date = new Date()) {
    const days = [];
    const currentDay = date.getDay(); // 0 is Sunday
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - currentDay);

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        days.push(day);
    }
    return days;
}

export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}
