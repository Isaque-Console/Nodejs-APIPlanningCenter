import baseAPI from "../config/axios/axiosConfig";
import { convertDescriptionToArray, getDescriptionByTitle } from "../utils/arrayUtils";

/**
 * @description Get event datas from planning center and filter by title  
 * 
 * @returns a string that contains the item description
 */
export const getDescription = async (url: string): Promise<string> => {
    let description: string = "";

    await (() => {
        baseAPI.get(url)
            .then(async (response) => {
                description = await getDescriptionByTitle(response, ["intercessao", "interceçao", "intercessao", "intersesao", "intercesao", "intersessao"]);
                console.log(convertDescriptionToArray(description));
            })
            .catch(err => {
                console.error("Ops! ocorreu um erro " + err);
            });
    })()

    return description;
}