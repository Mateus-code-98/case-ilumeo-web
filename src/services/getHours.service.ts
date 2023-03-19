export const getHours = (date: any) => {
    date = new Date(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}