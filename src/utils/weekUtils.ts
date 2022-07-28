export const getDayOfTheWeek = () => {
    const daysOfTheWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    const day = new Date();
    return daysOfTheWeek[day.getDay()];
}