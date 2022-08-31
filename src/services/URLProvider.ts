import dayjs from 'dayjs';
import { getDayOfTheWeek, subtractDate } from "../utils/dateUtils"

const todaysServiceTypeGenerator = (): string => {
   let serviceType: string = "";
   const dayOfTheWeek: string = getDayOfTheWeek();

   if (!dayOfTheWeek.length) return "";

   // Quarta-feira esta sendo levado em consideracao, pois o horario do servidor no heroku e diferente e pode acusar esse dia, ao inves de terca, dependendo do horario
   if (dayOfTheWeek === "Terça-Feira" || dayOfTheWeek === "Quarta-Feira") {
      serviceType = "CULTO_DE_ENSINO";
   } else if (dayOfTheWeek === "Domingo") {
      // hora atual -3, pois o horario do servidor no heroku esta 3 horas adiantado em relacao ao horario do Brasil
      serviceType = (dayjs().hour() - 3) > 13 ? "DOMINGO_NOITE" : "DOMINGO_MANHA";
   }

   return serviceType;
}

const todaysPlanIdGenerator = (todaysServiceType: any): number => {
   const dayOfTheWeek: string = getDayOfTheWeek();

   if(!dayOfTheWeek.length) return 0;

   const diffenrenceInWeeks: number = subtractDate(dayOfTheWeek);
   if(diffenrenceInWeeks === -1) return diffenrenceInWeeks;
   const planId = process.env[`PLAN_ID_${todaysServiceType}`] ? process.env[`PLAN_ID_${todaysServiceType}`] : "0";
   const todaysPlanId: number = diffenrenceInWeeks + Number(planId);

   return todaysPlanId;
}

export const generateURL = (): string => {
   const serviceType = todaysServiceTypeGenerator();
   const todaysPlanId: number = todaysPlanIdGenerator(serviceType);
   console.log("Service type: " + serviceType);
   console.log("Todays plan id: " + todaysPlanId);
   

   if (!serviceType.length || todaysPlanId === -1) return "Hoje não tem nenhum evento."

   return `/services/v2/service_types/${process.env[`SERVICE_TYPE_${serviceType}`]}/plans/${todaysPlanId}/items`;
}
