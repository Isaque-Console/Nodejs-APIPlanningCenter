import baseAPI from "../config/axios/axiosConfig";
import { getDescriptionByTitle } from "../utils/filterUtils";

/**
 * @description Get event datas from planning center and filter by title  
 * 
 * @returns a string that contains the item description
 */
export const getDescription = async () : Promise<string> => {
    let description : string = "";

    await (() => {
        baseAPI.get("/services/v2/service_types/963957/plans/59630660/items")
        .then(response => {
            description = getDescriptionByTitle(response, "intercessão");
            console.log(description);
        })
        .catch(err => {
            console.error("Ops! ocorreu um erro " + err);
        });
    })()
    
    return description;
}