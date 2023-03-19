import { IWorkedDaysProps } from "../interfaces";
import { generateDateService } from "./generateDate.service";

export const getWorkingDaysService = (workingDays: IWorkedDaysProps) => {
    let keys_not_today = Object.keys(workingDays).filter((key) => key !== "today");

    keys_not_today.sort((a, b) => {
        const data_a = generateDateService(a);
        const data_b = generateDateService(b);
        return data_a.getTime() - data_b.getTime();
    });

    return keys_not_today;
};