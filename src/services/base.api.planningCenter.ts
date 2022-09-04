import baseAPI from "../config/axios/axiosConfig";
import { getDescriptionByTitle } from "../utils/arrayUtils";

export const getDescription = async (url: string): Promise<string> => {
    const response = await baseAPI.get(url);
    const description = await getDescriptionByTitle(response, ["intercessao", "interceçao", "intercessao", "intersesao", "intercesao", "intersessao", "intercessao por cura", "intersessao por cura", "intercesao por cura", "intercessao por curas", "intercesao por curas", "intersessao por curas", "intercessao por cura/mural de oraçao"]);

    return description;
}