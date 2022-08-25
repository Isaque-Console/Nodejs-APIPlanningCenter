import dayjs from 'dayjs';

export const getDayOfTheWeek = (): string => {
    const daysOfTheWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const indexOfTheWeek = new Date().getDay();
    if (indexOfTheWeek === 0 || indexOfTheWeek === 2) return daysOfTheWeek[indexOfTheWeek]

    return "";
}

export const subtractDate = (dayOfTheWeek: string): number => {
    const now = dayjs();

    if (dayOfTheWeek === "Terça-Feira") {
        const tuesdayDate = dayjs(process.env.DATE_TERCA);
        const difference = now.diff(tuesdayDate, 'week')

        return difference;
    } else if (dayOfTheWeek === "Domingo") {
        const sundayDate = dayjs(process.env.DATE_DOMINGO);
        const difference = now.diff(sundayDate, 'week');

        return difference;
    }

    return -1
}
