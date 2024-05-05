export function formatDataTime(dateTime) {
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateTime).toLocaleDateString('ru-RU', options);
}

export function period(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const minutes = Math.floor((diffTime / 1000) / 60);
    return `${Math.floor(minutes / 60)} часов ${minutes % 60} минут`;
}

