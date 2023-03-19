import { ICheckProps } from "../interfaces";

export const calcWorkingTimeService = (checks: ICheckProps[]) => {
    const workingTime = checks.reduce((acc: number, check) => {
        let { createdAt, updatedAt, finished } = check;

        if (!finished) updatedAt = new Date().toISOString();

        const checkStart = new Date(createdAt).getTime();

        const checkEnd = new Date(updatedAt).getTime();

        const checkDuration = checkEnd - checkStart;

        return acc + checkDuration;
    }, 0);

    return workingTime;
};