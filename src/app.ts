import express from "express";
import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
const server = express();


const urlPlanningCenter : string = "https://api.planningcenteronline.com"
const api = axios.create({
    baseURL: urlPlanningCenter,
    headers: {'Authorization': `Basic ${process.env.AUTHORIZATION}`,
    }
});

let description : string;

api.get("services/v2/service_types/963957/plans/59630660/items")
    .then(response => {
        response.data.data.forEach((activity : any) => {
            if(activity.attributes.title.trim().toLowerCase() === "intercessão"){
                description = activity.attributes.description;                
            }
        });
    })
    .catch(err => {
        console.error("ops! ocorreu um erro " + err);
    });

server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});