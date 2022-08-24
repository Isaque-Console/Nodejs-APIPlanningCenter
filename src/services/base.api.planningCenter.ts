import baseAPI from "../config/axios/axiosConfig";
import { getDescriptionByTitle } from "../utils/arrayUtils";

/**
 * @description Get event datas from planning center and filter by title  
 * 
 * @returns a string that contains the item description
 */
export const getDescription = async (url: string): Promise<string> => {
    const response = await baseAPI.get(url);
    const description = await getDescriptionByTitle(response, ["intercessao", "interceçao", "intercessao", "intersesao", "intercesao", "intersessao", "intercessao por cura"]);

    return description;
}