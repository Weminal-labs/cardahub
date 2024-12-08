export function dateToTimeStamp(date: string) {
    const dateObj = new Date(date);
    const timestamp = Math.floor(dateObj.getTime() / 1000);
    return timestamp;
}

export function timeStampToDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date;
}