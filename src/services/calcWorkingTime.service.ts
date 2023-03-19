import { ICheckProps } from "../interfaces";

export const calcWorkingTimeService = (checks: ICheckProps[], difference: number) => {
    const workingTime = checks.reduce((acc: number, check) => {
        let { createdAt, updatedAt, finished } = check;

        if (!finished) {
            const newUpdatedAt = new Date(updatedAt)
            newUpdatedAt.setSeconds(newUpdatedAt.getSeconds() + difference);
            updatedAt = newUpdatedAt.toISOString();
        }

        const checkStart = new Date(createdAt).getTime();

        const checkEnd = new Date(updatedAt).getTime();

        const checkDuration = checkEnd - checkStart;

        return acc + checkDuration;
    }, 0);

    return workingTime;
};