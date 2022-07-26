import axios from "axios";

const urlBase : string = "https://api.planningcenteronline.com"
export const baseAPI = axios.create({
        baseURL: urlBase,
        headers: {'Authorization': `Basic ${process.env.AUTHORIZATION}`,
    }
});

export default baseAPI;