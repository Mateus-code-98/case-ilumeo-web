export const generateDateService = (date: string) => {
    const day = date.split("/")[0];
    const month = date.split("/")[1];
    const year = date.split("/")[2];

    return new Date(`${month}/${day}/${year}`);
};