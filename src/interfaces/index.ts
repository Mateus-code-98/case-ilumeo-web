export interface IUserProps {
    id: string;
    code: string;
    createdAt: string;
    updatedAt: string;
};

export interface IWorkedDaysProps {
    [key: string]: {
        workingTime: number;
        checks: ICheckProps[];
    }
}

export interface ICheckProps {
    id: string;
    finished: boolean;
    createdAt: string;
    updatedAt: string;
}